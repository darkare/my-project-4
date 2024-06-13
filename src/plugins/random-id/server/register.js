'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'random-id',
    plugin: 'random-id',
    type: 'string',
});
};
