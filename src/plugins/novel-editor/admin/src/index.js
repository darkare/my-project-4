import { prefixPluginTranslations } from '@strapi/helper-plugin';
// import pluginPkg from '../../package.json';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import getTrad from './utils/getTrad';

import NovelEditor from './components/NovelEditor';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: 'novel-editor',
      pluginId:'novel-editor',
      icon: PluginIcon,
      type: 'json',
      intlLabel: {
        id: getTrad('novel-editor-field.label'),
        defaultMessage: 'Novel Editor ID int label',
      },
      intlDescription: {
        id: getTrad('novel-editor.description'),
        defaultMessage: 'Novel Editor description',
      },
      // intLabel: {
      //   id: 'novel-editor-field.label',
      //   defaultMessage: 'novel-editor.description',
      // },
      components: {
        // Input: async () => import('./components/NovelEditor'),
        Input: async () => import('./components/editor/advanced-editor.js')
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