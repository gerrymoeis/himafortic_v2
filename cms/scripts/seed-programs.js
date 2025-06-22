const path = require('path');
const Strapi = require('@strapi/strapi');

// Sample data for Program Kerja
const programsData = [
  {
    name: 'HIMAFORTIC Goes to School 2025',
    description: '<p>A program designed to introduce high school students to the world of informatics and the university environment.</p>',
    status: 'Planned',
    departmentName: 'Hubungan Masyarakat',
    evaluation_notes: 'Initial planning complete. Venue and speaker outreach in progress.'
  },
  {
    name: 'Competitive Programming Workshop',
    description: '<p>An intensive workshop for students to hone their competitive programming skills for national and international competitions.</p>',
    status: 'Ongoing',
    departmentName: 'Pengembangan Sumber Daya Anggota',
    evaluation_notes: 'Session 3 of 5 completed. Positive feedback from participants.'
  }
];

async function findDepartmentByName(instance, name) {
  const department = await instance.entityService.findMany('api::department.department', {
    filters: { name },
  });
  return department.length > 0 ? department[0] : null;
}

async function seedPrograms() {
  let instance;
  try {
    console.log('🚀 Starting Strapi for program seeding...');
    instance = await Strapi({
      appDir: path.join(__dirname, '..'),
      autoReload: false,
      serveAdminPanel: false,
    }).load();

    console.log('🧹 Cleaning existing Program Kerja and related data...');
    const existingPrograms = await instance.entityService.findMany('api::program.program', { fields: ['id'] });
    if (existingPrograms.length > 0) {
      await instance.entityService.deleteMany('api::program.program', { 
        filters: { id: { $in: existingPrograms.map(p => p.id) } }
      });
    }
    const existingProgramData = await instance.entityService.findMany('api::program-data.program-data', { fields: ['id'] });
    if (existingProgramData.length > 0) {
      await instance.entityService.deleteMany('api::program-data.program-data', { 
        filters: { id: { $in: existingProgramData.map(pd => pd.id) } }
      });
    }
    console.log('✅ Existing entries cleared.');

    console.log('🌱 Seeding new Program Kerja entries...');
    for (const program of programsData) {
      console.log(`  Processing program: ${program.name}`);
      const department = await findDepartmentByName(instance, program.departmentName);
      if (!department) {
        console.warn(`  - ⚠️ Department "${program.departmentName}" not found. Skipping program.`);
        continue;
      }

      const newProgram = await instance.entityService.create('api::program.program', {
        data: {
          name: program.name,
          description: program.description,
          status: program.status,
          department: department.id,
          publishedAt: new Date(),
        },
      });
      console.log(`  -> ✅ Created Program Kerja: ${newProgram.name} (ID: ${newProgram.id})`);

      await instance.entityService.create('api::program-data.program-data', {
        data: {
          program: newProgram.id,
          evaluation_notes: program.evaluation_notes,
          publishedAt: new Date(),
        },
      });
      console.log(`  -> ✅ Created associated Program Kerja Data.`);
    }

  } catch (error) {
    console.error('❌ An error occurred during the seeding process:');
    console.error(error.details?.errors || error);
    process.exit(1);
  } finally {
    if (instance) {
      console.log('✔️ Seeding process finished. Destroying Strapi instance...');
      await instance.destroy();
      process.exit(0);
    }
  }
}

seedPrograms();
