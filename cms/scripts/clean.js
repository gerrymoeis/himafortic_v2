const path = require('path');
const Strapi = require('@strapi/strapi');

/**
 * Script to clean all seeded data (Functionaries and non-admin Users).
 */
async function cleanDatabase() {
  console.log('Loading Strapi to clean database...');
  const strapi = await Strapi({
    appDir: path.join(__dirname, '..'),
    autoReload: false,
    serveAdmin: false,
  }).load();
  console.log('Strapi loaded successfully.');

  // --- 1. Clean Functionaries ---
  console.log('Deleting all entries from HIMAFORTIC Functionary...');
  const functionaries = await strapi.entityService.findMany('api::functionary.functionary', { fields: ['id'], limit: -1 });
  if (functionaries.length > 0) {
    const idsToDelete = functionaries.map(f => f.id);
    await strapi.entityService.deleteMany('api::functionary.functionary', {
      filters: { id: { $in: idsToDelete } },
    });
    console.log(`✅ Successfully deleted ${idsToDelete.length} functionary entries.`);
  } else {
    console.log('No functionary entries to delete.');
  }

  // --- 2. Clean Users (in the 'Authenticated' role) ---
  console.log('Deleting all non-admin users...');
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'authenticated' } });
  if (role) {
    const usersToDelete = await strapi.query('plugin::users-permissions.user').findMany({
      where: { role: { id: role.id } },
      select: ['id']
    });

    if (usersToDelete.length > 0) {
      const userIds = usersToDelete.map(u => u.id);
      await strapi.query('plugin::users-permissions.user').deleteMany({
        where: { id: { $in: userIds } }
      });
      console.log(`✅ Successfully deleted ${userIds.length} users.`);
    } else {
      console.log('No users in the Authenticated role to delete.');
    }
  } else {
    console.log('Could not find the "Authenticated" role. Skipping user deletion.');
  }

  console.log('\nDatabase cleaning process completed.');
  strapi.destroy();
}

cleanDatabase().catch(err => {
  console.error(err);
  process.exit(1);
});
