'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "tiptap-vite",
    plugin: "tiptap-vite",
    type: "json",
  });
};
