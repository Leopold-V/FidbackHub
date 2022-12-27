'use strict';
/**
 * project controller
 */
const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({ strapi }) => ({
  async create(ctx) {
    if (ctx.request.body.data.name === "" || !ctx.request.body.data.name) {
      throw new ApplicationError("You must provide a name for your project.");
    }
    if (ctx.request.body.data.github_url === "" || !ctx.request.body.data.github_url) {
      throw new ApplicationError("You must provide a github url for your project.");
    }
    if (ctx.request.body.data.website_url === "" || !ctx.request.body.data.website_url) {
      throw new ApplicationError("You must provide a website url for your project.");
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
    try {
      if (ctx.request.body.data.name === "" || !ctx.request.body.data.name) {
        throw new Error();
      }
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
