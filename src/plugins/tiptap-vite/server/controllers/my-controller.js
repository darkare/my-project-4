'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('tiptap-vite')
      .service('myService')
      .getWelcomeMessage();
  },
});
