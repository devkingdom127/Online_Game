"use strict";

module.exports = {
  async usersInfo() {
    let entities;
    entities = await strapi.query("user", "users-permissions").find();
    entities = entities.map((user) => ({
      username: user.username,
      email: user.email,
    }));
    return entities;
  },

  async checkAvailability(ctx) {
    const body = ctx.request.body;
    let query = {};
    query[body.key] = body.value;
    const isExist = await strapi
      .query("user", "users-permissions")
      .model.exists(query);
    return isExist;
  },

  async report(ctx) {
    // let total;
    // total = await strapi
    //   .query("user", "users-permissions")
    //   .count({ createdAt_gt: "2021-08-01T00:00:00Z", username: 1 }, [
    //     "username",
    //   ]);
    // return total;

    // return strapi.query("user", "users-permissions").model.find({});
    return strapi.query("user", "users-permissions").model.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date("2021-01-01T00:00:00.000Z"),
            $lte: new Date("2021-09-01T00:00:00.000Z"),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
  },
};
