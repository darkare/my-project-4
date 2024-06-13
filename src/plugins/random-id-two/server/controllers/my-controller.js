'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('random-id-two')
      .service('myService')
      .getWelcomeMessage();
  },
});
