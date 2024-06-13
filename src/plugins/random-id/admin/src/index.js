import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import getTrad from './utils/getTrad';
import RandomId from './components/RandomId';


const name = pluginPkg.strapi.name;

export default {
  register(app) {
    // app.addFields({type:'string', Component: async () => {
    //   const component = await import('./components/RandomId');
    //   return component.default;
    // }});

    app.customFields.register({
      name: 'random-id',
      pluginId: 'random-id',
      type: 'string',
      icon: PluginIcon,
      intlLabel: {
        id: getTrad('random-id.label'),
        defaultMessage: 'Random ID int label',
      },
      intlDescription: {
        id: getTrad('random-id.description'),
        defaultMessage: 'Random ID description',
      },
      components: {
        Input: async () => import('./components/RandomId'),
        // Input: RandomId
      },
    });

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import('./pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
