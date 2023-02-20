'use strict';

const { schemaCreate } = require('../content-types/comment/validation');

/**
 * comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({ strapi }) => ({
  async create(ctx) {
    const { error } = schemaCreate.validate(ctx.request.body.data);
    if (error) {
      return ctx.badRequest(error.details[0].message, {...error.details[0]})
    }
    try {
      const project = await strapi.db.query("api::project.project").findOne({
        where: {
          id: ctx.request.body.projectId,
          $or: [
            {
              user: ctx.state.user.id
            },
            {
              members: ctx.state.user.id
            }
          ]
        },
      });
      if (!project) {
        return ctx.badRequest(`Error 404, ressource not found`);
      }
      const response = await strapi.db.query("api::comment.comment").create({
        data: { ...ctx.request.body.data },
        populate: { feedback: true },
      });
      return {
        data: { id: response.id, attributes: { ...response } },
        meta: {},
      };
    } catch (error) {
      console.log(error.message);
      throw new ApplicationError(error.message);
    }
  },
}));
