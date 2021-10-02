module.exports = (strapi) => {
  const { Sequelize } = require("sequelize");

  return {
    async initialize() {
      strapi.services.gameDB = new Sequelize(
        strapi.config.hook.settings.gameDB.db,
        strapi.config.hook.settings.gameDB.username,
        strapi.config.hook.settings.gameDB.password,
        {
          host: strapi.config.hook.settings.gameDB.host,
          dialect: "mssql",
          dialectOptions: {
            options: {
              useUtc: false,
              dateFirst: 1,
            },
          },
        }
      );
    },
  };
};
