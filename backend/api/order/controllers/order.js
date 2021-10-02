'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // async create(ctx) {
    //     let entity;
    //     const user_id = ctx.request.user.id;
    //     if (ctx.is('multipart')) {
    //       const { data, files } = parseMultipartData(ctx);
    //       entity = await strapi.services.restaurant.create({...data, user_id }, { files });
    //     } else {
    //       entity = await strapi.services.restaurant.create({...ctx.request.body, user_id });
    //     }
    //     return sanitizeEntity(entity, { model: strapi.models.restaurant });
    //   },
};
