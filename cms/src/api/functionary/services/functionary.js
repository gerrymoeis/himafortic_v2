'use strict';

/**
 * functionary service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::functionary.functionary');
