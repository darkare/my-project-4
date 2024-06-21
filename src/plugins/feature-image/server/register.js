'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "feature-image",
    plugin: "feature-image",
    type: 'integer',
    // handlers: {
    //   onAdd: async (data) => {
    //     // handle adding an image
    //   },
    //   onEdit: async (data) => {
    //     // handle editing an image
    //   },
    //   onDelete: async (data) => {
    //     // handle deleting an image
    //   },
    //   onRead: async (data) => {
    //     // handle reading an image
    //   },
    // },
  });
};
