"use strict";

const { type } = require("../../../api/bio/routes/bio");

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "novel-editor",
    plugin: "novel-editor",
    type: "json",
  });
};
//   strapi.customFields.register({
//     name: 'novel-editor',
//     plugin: 'novel-editor',
//     component: 'NovelEditor',
//     type: 'string',
//     intlLabel: {
//       id: 'novel-editor-field.label',
//       defaultMessage: 'novel-editor.description',
//     },
//   });
// };
// app.customFields.register({
//   name: 'novel-editor',
//   // pluginId:'novel-editor-plugin',
//   type: 'string',
//   intLabel: {
//     id: 'novel-editor-field.label',
//     defaultMessage: 'Novel Editor',
//   },
//   components: {
//     Input: NovelEditor,
//   },
// });
