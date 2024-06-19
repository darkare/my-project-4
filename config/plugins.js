const path = require('path');
const crypto = require('crypto');

async function generateHash(input) {
    return new Promise((resolve, reject) => {
        try {
            const hash = crypto.createHash('md5').update(input).digest('hex');
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

module.exports = {
    // ...
    'my-plugin': {
      enabled: true,
      resolve: './src/plugins/my-plugin'
    },
    'random-id': {
      enabled: true,
      resolve: './src/plugins/random-id'
    },
    'novel-editor': {
      enabled: true,
      resolve: './src/plugins/novel-editor'
    },
    'tiptap-vite': {
      enabled: true,
      resolve: './src/plugins/tiptap-vite'
    },
    'slate-ed': {
      enabled: true,
      resolve: './src/plugins/slate-ed'
    },
    upload: {
      config: {
        provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
        providerOptions: {
            bucketName: 'mamamia-pwa-staging.appspot.com',
            publicFiles: true,
            uniform: false,
            serviceAccount:require('./serviceAccount.json'), // your service account json
            baseUrl: 'https://storage.googleapis.com/mamamia-pwa-staging.appspot.com',
            basePath: 'strapi-media',
            generateUploadFileName: async (file) => {
              const hash = await generateHash(file.name); 
              console.log('111-hash',{ hash});
              const extension = file.ext.toLowerCase().substring(1);
              return `${extension}/${slugify(path.parse(file.name).name)}-${hash}.${extension}`;
            },
        },
      },
    },
  }