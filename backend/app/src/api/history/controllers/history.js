'use strict';

/**
 * history controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::history.history', ({strapi}) => ({
  async find(ctx) {
    try {
      const projects = await strapi.db.query("api::project.project").findMany({
        where: {
          $or: [
            {
              user: ctx.state.user.id
            },
            {
              members: ctx.state.user.id
            }
          ]
        },
        populate: { user: true },
      });
      const response = await strapi.db.query("api::history.history").findMany({
        where: {
          project: {
            id: {
              $in: projects.map((ele) => ele.id),
            },

          },
        },
        populate: { project: true, author: true },
      });
      return {
        data: { id: response.id, attributes: { ...response } },
        meta: {},
      };
    } catch (error) {
      console.log(error);
      throw new ApplicationError();
    }
  },
}));
