// /api/article/content-types/article/lifecycles.js

module.exports = {
  async beforeCreate(event) {
    const { data, where, model, populate } = event.params;
    console.log("111-30-beforeCreate", { data, where, model, populate });

    // Perform actions that do not require the record's id.
    // For example, validate or modify data fields before creation.
  },

  async afterCreate(event) {
    const { data, where, model, populate } = event.params;
    console.log("111-33-aftercreate", {
      r: event.result,
      data,
      where,
      model,
      populate,
    });

    if (data.fb_image && data.fb_image.id) {
      const relationData = {
        related_type: "api::mm-feature-image.mm-feature-image", // Adjust the related_type value as per your application's naming convention
        related_id: event.result.id, // ID of the newly created mm-feature-image record
        file_id: data.fb_image.id, // ID of the file image
        field: "fb_image",
        order: 1,
      };
      // Insert the relation into file_related_morph table
      // This example uses Strapi's query API, adjust according to your database access method
        // await strapi.db.query("plugin::upload.files_related_morphs").create({
        //   data: relationData,
        // });
    //   await strapi.db.connection("files_related_morphs").insert(relationData);
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    console.log("111-34-data", { data, where });
    if (data.fb_image) {
      // Delete existing relations
      // const existingRelations = await strapi.entityService.findMany('plugin::upload.file', {
      //     filters: {
      //       related: {
      //         id: where.id,
      //         __contentType: 'api::mm-feature-image.mm-feature-image',
      //         field: 'fb_image',
      //       },
      //     },
      //   });
      // console.log('111-34-existingRelations', existingRelations);
      //   for (const r of existingRelations) {
      //     await strapi.entityService.delete('plugin::upload.file', r.id);
      //   }
      // await strapi.query('plugin::upload.file').deleteMany({
      //   where: {
      //     related: {
      //       id: where.id,
      //       __contentType: 'api::mm-feature-image.mm-feature-image',
      //       field: 'fb_image',
      //     },
      //   },
      // });
      // Create new relation
      // await strapi.query('plugin::upload.file').create({
      //   data: {
      //     related: [
      //       {
      //         id: where.id,
      //         __contentType: 'api::mm-feature-image.mm-feature-image',
      //         field: 'fb_image',
      //       },
      //     ],
      //     file: data.fb_image,
      //   },
      // });
    }
  },
};
