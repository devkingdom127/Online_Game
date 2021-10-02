module.exports = ({ env }) => ({
  settings: {
    gameDB: {
      enabled: true,
      username: env("GAME_DB_USERNMAE"),
      password: env("GAME_DB_PASSWORD"),
      db: env("GAME_DB_NAME"),
      host: env("GAME_DB_HOST"),
    },
  },
});
