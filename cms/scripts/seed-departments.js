const path = require('path');
const Strapi = require('@strapi/strapi');

/**
 * This script seeds the database with Departments and assigns Functionaries to them.
 * It first cleans all existing departments, then creates the new ones,
 * and finally updates each functionary with their respective department ID based on a NIM mapping.
 */

// The list of departments to be created.
const DEPARTMENTS = [
  'Badan Pengurus Harian',
  'Departemen PSDM',
  'Departemen Penristek',
  'Departemen Dalam Negeri',
  'Departemen Kominfo',
  'Departemen Luar Negeri',
  'Departemen Agama Sosial',
  'Departemen MnB',
  'Ekonomi Kreatif',
];

// Manual mapping of NIM to department name to overcome inconsistencies in data files.
const NIM_TO_DEPARTMENT_MAP = {
  '23091397038': 'Badan Pengurus Harian', // Tegar Eka Pambudi El Akhsan
  '23091397178': 'Badan Pengurus Harian', // Achmad Diky Setiawan
  '23091397098': 'Badan Pengurus Harian', // Atika Haniifatun Nisa'
  '23091397089': 'Badan Pengurus Harian', // Diah Arum Cahyaningtyas
  '24091397088': 'Badan Pengurus Harian', // Nayla Rahayu Puspitasari
  '23091397110': 'Badan Pengurus Harian', // Fiana Agta Riyani
  '23091397054': 'Badan Pengurus Harian', // Ambar Zahrotul Wardah
  '24091397083': 'Badan Pengurus Harian', // Aftita Choirunnisa
  '23091397207': 'Departemen PSDM',       // Fina Fadhilah Maulana
  '23091397057': 'Departemen PSDM',       // Rachmah Fia Putri Dewi
  '24091397026': 'Departemen PSDM',       // Gathan Yandino Putra
  '24091397113': 'Departemen PSDM',       // Septiana Dwi Lestari
  '24091397117': 'Departemen PSDM',       // Fitrya Chalifatus Zahro
  '23091397164': 'Departemen Penristek',  // Gerry Moeis
  '23091397087': 'Departemen Penristek',  // Dickrullah Brilian Akbar
  '23091397159': 'Departemen Penristek',  // Ardelia Zahra Farsiana
  '24091397100': 'Departemen Penristek',  // Ulur Rosyad Rachmandani
  '24091397049': 'Departemen Penristek',  // Valentania Alia Febrian
  '24091397071': 'Departemen Penristek',  // Whimawansyah Sabilillah
  '24091397151': 'Departemen Penristek',  // Ditio Septian R
  '23091397137': 'Departemen Dalam Negeri',// Muhammad Nizar Amirul H.
  '23091397168': 'Departemen Dalam Negeri',// Yosion Besty Marpaung
  '23091397112': 'Departemen Dalam Negeri',// Victorio Khalifah Indra
  '23091397104': 'Departemen Dalam Negeri',// Nesyari Az-Zahra
  '24091397084': 'Departemen Dalam Negeri',// Diana Safitri
  '24091397004': 'Departemen Dalam Negeri',// Khabibi Al Munif
  '24091397139': 'Departemen Dalam Negeri',// Elia Rifana Rif'an
  '23091397113': 'Departemen Kominfo',    // Naufal Rizky Nugroho
  '23091397077': 'Departemen Kominfo',    // Nur Aini Setya Puti
  '23091397173': 'Departemen Kominfo',    // Dea Ayu Novita Putri
  '23091397067': 'Departemen Kominfo',    // Naila Khalishah Mahendra
  '23091397108': 'Departemen Kominfo',    // Muhammad Rafif Ramadhan
  '24091397053': 'Departemen Kominfo',    // Syawailie Syaf Anhar
  '24091397076': 'Departemen Kominfo',    // Meyssa Aqila Adikara
  '24091397102': 'Departemen Kominfo',    // Michiana Defi Gunawan
  '23091397177': 'Departemen Luar Negeri', // Salzabila Ananda Putri
  '23091397079': 'Departemen Luar Negeri', // Widirga Putri Aditya Wardaningtyas
  '23091397194': 'Departemen Luar Negeri', // Zaidan Mudzaky Juan Kusuma
  '23091397040': 'Departemen Luar Negeri', // Astrid Yobela Lumbantobing
  '24091397034': 'Departemen Luar Negeri', // Hanson Philip
  '24091397145': 'Departemen Luar Negeri', // Selvi Adinda Hermawati
  '24091397160': 'Departemen Luar Negeri', // Moch. Izzul Maulana H.
  '23091397171': 'Departemen Agama Sosial',// Vergi Mutia Rahmasyani
  '23091397153': 'Departemen Agama Sosial',// Alya Faadhilah Putri
  '24091397006': 'Departemen Agama Sosial',// Aghnia Diffitri Naurasyahbana
  '24091397155': 'Departemen Agama Sosial',// Billy Bayhakhi
  '24091397103': 'Departemen Agama Sosial',// Faiz Maulana
  '23091397210': 'Departemen MnB',        // M. Raka Phaedra Agus Putra
  '23091397091': 'Departemen MnB',        // Muhammad Ulil Amri
  '24091397041': 'Departemen MnB',        // Lelycha Agnafarah Hendrawinata
  '24091397169': 'Departemen MnB',        // Moch Hafidz Asrof
  '24091397031': 'Departemen MnB',        // Gading Kent Sadewa
  '24091397090': 'Departemen MnB',        // Ega khamidatin niswa
  '23091397107': 'Ekonomi Kreatif',       // Chaterina Fatma Diaksa
  '23091397109': 'Ekonomi Kreatif',       // Azizatul Husniyah
  '23091397075': 'Ekonomi Kreatif',       // Lusida Cynthia Winayu
  '24091397017': 'Ekonomi Kreatif',       // Makrus Fahrul Muharrom
  '24091397099': 'Ekonomi Kreatif',       // Achmad Hakim ALJumadi
  '24091397068': 'Ekonomi Kreatif',       // Jihan Salma Salsabila
};

async function cleanAndSeed() {
  let instance;
  try {
    console.log('🚀 Starting Strapi...');
    // @ts-ignore - The linter is confused by the module export type, but this is the correct programmatic call for Strapi v4.
    instance = await Strapi({
      appDir: path.join(__dirname, '..'),
      autoReload: false,
      serveAdminPanel: false,
    }).load();

    console.log('🧹 Cleaning existing departments...');
    // @ts-ignore - Linter can't infer dynamic types from entityService
    const existingDepartments = await instance.entityService.findMany('api::department.department', { fields: ['id'] });
    if (existingDepartments.length > 0) {
      await instance.entityService.deleteMany('api::department.department', { 
        // @ts-ignore - Linter can't infer dynamic types from entityService
        filters: { id: { $in: existingDepartments.map(d => d.id) } }
      });
      console.log(`✅ Deleted ${existingDepartments.length} old departments.`);
    }

    console.log('🌱 Seeding new departments...');
    const createdDepartmentPromises = DEPARTMENTS.map(name => 
      instance.entityService.create('api::department.department', { data: { name } })
    );
    const createdDepartments = await Promise.all(createdDepartmentPromises);
    console.log(`✅ Created ${createdDepartments.length} new departments.`);

    const departmentNameToIdMap = createdDepartments.reduce((map, dept) => {
      // @ts-ignore - Linter can't infer dynamic types from entityService
      map[dept.name] = dept.id;
      return map;
    }, {});

    console.log('🔄 Updating functionaries with department assignments...');
    // @ts-ignore - Linter can't infer dynamic types from entityService
    const functionaries = await instance.entityService.findMany('api::functionary.functionary', { fields: ['id', 'NIM'] });
    
    if (functionaries.length === 0) {
        console.warn('⚠️ No functionaries found to update. Please seed functionaries first.');
        return;
    }

    let updatedCount = 0;
    const updatePromises = functionaries.map(func => {
      // @ts-ignore - Linter can't infer dynamic types from entityService
      const departmentName = NIM_TO_DEPARTMENT_MAP[func.NIM];
      if (departmentName) {
        const departmentId = departmentNameToIdMap[departmentName];
        if (departmentId) {
          updatedCount++;
          // @ts-ignore - Linter can't infer dynamic types from entityService
          return instance.entityService.update('api::functionary.functionary', func.id, {
            data: { department: departmentId },
          });
        }
      }
      // @ts-ignore - Linter can't infer dynamic types from entityService
      console.warn(`- Could not find department for functionary with NIM: ${func.NIM}`);
      return Promise.resolve();
    });

    await Promise.all(updatePromises);
    console.log(`✅ Successfully updated ${updatedCount} of ${functionaries.length} functionaries with their departments.`);

  } catch (error) {
    console.error('❌ An error occurred during the seeding process:');
    console.error(error.details?.errors || error);
    process.exit(1);
  } finally {
    if (instance) {
      console.log('✔️ Seeding process finished. Destroying Strapi instance...');
      await instance.destroy();
    }
  }
}

cleanAndSeed();
