'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('feature-image')
      .service('myService')
      .getWelcomeMessage();
  },
});
