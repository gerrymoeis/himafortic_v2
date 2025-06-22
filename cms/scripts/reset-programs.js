const path = require('path');
const Strapi = require('@strapi/strapi');

/**
 * This script resets the Program Kerja and Program Kerja Data content types by deleting all their entries.
 */
async function resetPrograms() {
  let instance;
  try {
    console.log('🚀 Starting Strapi to reset program data...');
    instance = await Strapi({
      appDir: path.join(__dirname, '..'),
      autoReload: false,
      serveAdminPanel: false,
    }).load();

    console.log('🧹 Deleting all Program Kerja and Program Kerja Data entries...');

    // Clear Program Kerja entries
    const existingPrograms = await instance.entityService.findMany('api::program.program', { fields: ['id'], limit: -1 });
    if (existingPrograms.length > 0) {
      await instance.entityService.deleteMany('api::program.program', { 
        filters: { id: { $in: existingPrograms.map(p => p.id) } }
      });
      console.log(`  -> ✅ Deleted ${existingPrograms.length} Program Kerja entries.`);
    } else {
      console.log('  -> ⚪ No Program Kerja entries to delete.');
    }

    // Clear Program Kerja Data entries
    const existingProgramData = await instance.entityService.findMany('api::program-data.program-data', { fields: ['id'], limit: -1 });
    if (existingProgramData.length > 0) {
      await instance.entityService.deleteMany('api::program-data.program-data', { 
        filters: { id: { $in: existingProgramData.map(pd => pd.id) } }
      });
      console.log(`  -> ✅ Deleted ${existingProgramData.length} Program Kerja Data entries.`);
    } else {
      console.log('  -> ⚪ No Program Kerja Data entries to delete.');
    }

  } catch (error) {
    console.error('❌ An error occurred during the reset process:');
    console.error(error.details?.errors || error);
    process.exit(1);
  } finally {
    if (instance) {
      console.log('✔️ Reset process finished. Destroying Strapi instance...');
      await instance.destroy();
      process.exit(0);
    }
  }
}

resetPrograms();
