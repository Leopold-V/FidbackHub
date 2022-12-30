'use strict';
/**
 * project controller
 */
const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;
const { createCoreController } = require('@strapi/strapi').factories;
const { schemaCreate, schemaUpdate } = require('../content-types/project/validation');

module.exports = createCoreController('api::project.project', ({ strapi }) => ({
  async create(ctx) {
    const { error } = schemaCreate.validate(ctx.request.body.data);
    if (error) {
      return ctx.badRequest(error.details[0].message, {...error.details[0]})
    }
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
    console.log(ctx.request.body.data);
    const { error } = schemaUpdate.validate(ctx.request.body.data);
    if (error) {
      return ctx.badRequest(error.details[0].message, {...error.details[0]})
    }
    try {
      const response = await strapi.db.query('api::project.project').update({
        where: {id: ctx.params.id, user: ctx.state.user.id},
        data: ctx.request.body.data,
        populate: { user: true },
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      throw new ApplicationError();
    }
  },
  async delete(ctx) {
    try {
      const rep = await strapi.db.query('api::rating.rating').findMany({
        where: {project: ctx.params.id},
        populate: { project: true }
      });
      rep.forEach(async (ele) => {
        await strapi.db.query('api::rating.rating').delete({
          where: {id: ele.id},
        })
      })
      const project = await strapi.db.query('api::project.project').delete({
        where: {id: ctx.params.id, user: ctx.state.user.id},
        populate: { user: true },
      });
      return {data: {id: project.id, attributes: {...project}}, meta: {}};
    } catch (error) {
      console.log(error);
      throw new ApplicationError();
    }
  },
  async projectUser(ctx) {
    try {
      const response = await strapi.db.query('api::project.project').findMany({
        where: { user: ctx.state.user.id},
        populate: { ratings: true },
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      console.log(error.message);
      throw new ApplicationError();
    }
  },
}));
