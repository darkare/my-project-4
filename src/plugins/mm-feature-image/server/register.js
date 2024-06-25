'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'mm-feature-image',
    plugin: 'mm-feature-image',
    type: 'json',
});
};
