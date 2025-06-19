const fs = require('fs');
const path = require('path');
const Strapi = require('@strapi/strapi');

/**
 * Gets a usable first name from a full name, with a fallback for initials.
 * @param {string} fullName The person's full name.
 * @returns {string} A usable first name.
 */
function getFirstName(fullName) {
  const words = fullName.trim().split(' ');
  // If the first word is an initial (2 chars or less) and there's a second word, use the second word.
  if (words.length > 1 && words[0].length <= 2) {
    return words[1].toLowerCase();
  }
  // Otherwise, use the first word.
  return words[0].toLowerCase();
}


/**
 * Seed script to populate Strapi users from a JSON file with revised logic.
 */
async function seedUsers() {
  // --- 1. Load Strapi instance ---
  console.log('Loading Strapi for user seeding...');
  const strapi = await Strapi({
    appDir: path.join(__dirname, '..'),
    autoReload: false,
    serveAdmin: false,
  }).load();
  console.log('Strapi loaded successfully.');

  // --- 2. Define data source ---
  const sourceFilePath = path.join(__dirname, '..', '..', 'docs', 'himafortic_data.json');

  // --- 3. Read and parse the data file ---
  if (!fs.existsSync(sourceFilePath)) {
    console.error(`Error: Data file not found at ${sourceFilePath}`);
    strapi.destroy();
    return;
  }
  const data = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));
  console.log(`Found ${data.length} records to process for user creation.`);

  // --- 4. Get the 'Authenticated' role ---
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'authenticated' } });
  if (!role) {
    console.error('Could not find the "Authenticated" role. Please make sure it exists in your Strapi setup.');
    strapi.destroy();
    return;
  }
  console.log(`Found 'Authenticated' role with ID: ${role.id}`);

  // --- 5. Loop and create user entries ---
  for (const item of data) {
    try {
      const nim = String(item.NIM);
      const lastNameThreeDigits = nim.slice(-3);
      const firstName = getFirstName(item.Nama);

      const email = `${firstName}_${lastNameThreeDigits}@himafortic.com`;
      const password = `himafortic_${firstName}_${lastNameThreeDigits}`;
      const username = email; // Use email as the username for simplicity and uniqueness

      // Check if a user with this email already exists
      const existingUser = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

      if (existingUser) {
        console.log(`Skipping: User with email ${email} already exists.`);
        continue;
      }

      // Create the user entry
      await strapi.plugins['users-permissions'].services.user.add({
        username,
        email,
        password,
        provider: 'local',
        confirmed: true, // Automatically confirm the user
        blocked: false,
        role: role.id,
      });

      console.log(`Created user: ${username}`);

    } catch (error) {
      console.error(`Error processing user for ${item.Nama}:`, error.message);
    }
  }

  console.log('User seeding process completed.');
  strapi.destroy();
}

// Run the seed function
seedUsers().catch(err => {
  console.error(err);
  process.exit(1);
});
