'use strict';

/**
 * program-data service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::program-data.program-data');
