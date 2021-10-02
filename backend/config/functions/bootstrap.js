'use strict';

const { default: createStrapi } = require("strapi");

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = async () => {
    await strapi.services.gameDB.authenticate();
    // const data = await strapi.services.gameDB.query("SELECT * from TopTenPlayers");
};
