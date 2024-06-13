'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('novel-editor')
      .service('myService')
      .getWelcomeMessage();
  },
});
