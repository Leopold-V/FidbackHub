'use strict';
/**
 * project controller
 */
const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({ strapi }) => ({
  async create(ctx) {
    try {
      const response = await strapi.db.query('api::project.project').create({
        data: ctx.request.body.data,
        populate: { user: true }
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      throw new ApplicationError();
    }
  },
  async findOne(ctx) {
    try {
      const response = await strapi.db.query('api::project.project').findOne({
        where: {id: ctx.params.id, user: ctx.state.user.id},
        populate: { user: true, ratings: true },
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      throw new ApplicationError();
    }
  },
  async update(ctx) {
    try {
      if (ctx.request.body.data.name === "" || !ctx.request.body.data.name) {
        throw new Error();
      }
      const response = await strapi.db.query('api::project.project').update({
        where: {id: ctx.params.id, user: ctx.state.user.id},
        data: ctx.request.body.data,
        populate: { user: true, ratings: true },
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      console.log(error.message);
      throw new ApplicationError();
    }
  },
  async delete(ctx) {
    try {
      const response = await strapi.db.query('api::project.project').delete({
        where: {id: ctx.params.id, user: ctx.state.user.id},
        populate: { user: true },
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      throw new ApplicationError();
    }
  }
}));
