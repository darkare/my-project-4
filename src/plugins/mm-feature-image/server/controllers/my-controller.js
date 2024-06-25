'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('mm-feature-image')
      .service('myService')
      .getWelcomeMessage();
  },
});
