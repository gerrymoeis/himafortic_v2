const fs = require('fs');
const path = require('path');
const Strapi = require('@strapi/strapi');

/**
 * Seed script to populate the 'Functionary' content type from a JSON file.
 */
async function seed() {
  // --- 1. Load Strapi instance ---
  console.log('Loading Strapi...');
  // We pass the app's root directory to ensure it loads the database config correctly.
  // We also disable auto-reloading and serving the admin panel for a faster, lighter script.
  const strapi = await Strapi({
    appDir: path.join(__dirname, '..'),
    autoReload: false,
    serveAdmin: false,
  }).load();
  console.log('Strapi loaded successfully.');

  // --- 2. Define data source and constants ---
  // The path is relative to the root of the /cms project
  const sourceFilePath = path.join(__dirname, '..', '..', 'docs', 'himafortic_data.json');
  const period = '2024/2025';

  // --- 3. Read and parse the data file ---
  if (!fs.existsSync(sourceFilePath)) {
    console.error(`Error: Data file not found at ${sourceFilePath}`);
    strapi.destroy(); // Close the Strapi instance
    return;
  }
  const data = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));
  console.log(`Found ${data.length} records to process.`);

  // --- 4. Loop and create entries ---
  for (const item of data) {
    try {
      // Check if an entry with this NIM already exists to prevent duplicates
      const existingEntry = await strapi.entityService.findMany('api::functionary.functionary', {
        filters: { NIM: String(item.NIM) },
      });

      if (existingEntry.length > 0) {
        console.log(`Skipping: Functionary with NIM ${item.NIM} (${item.Nama}) already exists.`);
        continue;
      }

      // Prepare the data for the new entry based on user's logic
      const entry = {
        name: item.Nama,
        position: item.Jabatan,
        NIM: String(item.NIM),
        period: period,
        class_year: `20${String(item.NIM).substring(0, 2)}`,
      };

      // Create the entry in the database
      await strapi.entityService.create('api::functionary.functionary', {
        data: entry,
      });

      console.log(`Created: Functionary for ${entry.name} (NIM: ${entry.NIM})`);

    } catch (error) {
      console.error(`Error processing ${item.Nama}:`, error.message);
    }
  }

  console.log('Seeding process completed.');
  // Close the Strapi instance to allow the script to exit
  strapi.destroy();
}

// Run the seed function
seed();
