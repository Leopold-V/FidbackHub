'use strict';
/**
 * rating controller
 */
const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::rating.rating', ({ strapi }) => ({
  async create(ctx) {
    try {
      const project = await strapi.db.query('api::project.project').findOne({
        where: {id: ctx.request.body.data.project, api_key: ctx.request.body.data.projectToken},
        populate: { ratings: true },
      });
      if (!project) {
        throw new Error('No project found with this api key.');
      }
      const response = await strapi.db.query('api::rating.rating').create({
        data: ctx.request.body.data,
        populate: { project: true }
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      console.log(error.message);
      throw new ApplicationError();
    }
  },
}));
