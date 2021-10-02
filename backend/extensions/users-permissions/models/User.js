const { default: createStrapi } = require("strapi");

module.exports = {
  lifecycles: {
    async beforeCreate(data) {},
    async beforeUpdate(data) {},
    async afterDestroy(model, result) {
      // const cart = await strapi.services.cart.delete({ user: model.id });
      // console.log('cart deleted! id:', cart.id);
    },
    async afterCreate(model, attrs, options) {
      //   const cart = await strapi.services.cart.create({ user: model.id });
      //   console.log("cart created! id: ", cart.id);

      strapi.plugins["users-permissions"].services.user.sendConfirmationEmail(
        model
      );
    },
  },
};
