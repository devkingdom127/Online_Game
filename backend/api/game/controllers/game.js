'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async topTenPlayers(ctx) {
        const data = await strapi.services.gameDB.query("SELECT * from [dbo].[TopTenPlayers]");
        return data;
    },
    async topTenPets(ctx) {
        const data = await strapi.services.gameDB.query("SELECT * from [dbo].[TopTenPets]");
        return data;
    },
    async topTenGuilds(ctx) {
        const data = await strapi.services.gameDB.query("SELECT * from [dbo].[GuildView]");
        return data;
    },
    async totalOnlinePlayers(ctx) {
        const data = await strapi.services.gameDB.query("SELECT COUNT(case Connected when 'True' then 1 end) from [dbo].[Accounts]");
        return data;
    },
};
