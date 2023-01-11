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
      const existingProject = await strapi.db.query('api::project.project').findOne({
        where: {name: ctx.request.body.data.name, user: ctx.request.body.data.user},
        populate: { user: true }
      });
      if (existingProject) {
        return ctx.badRequest(`A project with the name ${ctx.request.body.data.name} already exist!`);
      }
      const existingWebsite = await strapi.db.query('api::project.project').findOne({
        where: {website_url: ctx.request.body.data.website_url, user: ctx.request.body.data.user},
        populate: { user: true }
      });
      if (existingWebsite) {
        return ctx.badRequest(`A project with the website ${ctx.request.body.data.website_url} already exist!`);
      }
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
        where: {
          id: ctx.params.id,
          $or: [
            {
              user: ctx.state.user.id
            },
            {
              members: ctx.state.user.id
            }
          ]
        },
        populate: { user: true, feedbacks: true, members: true },
      });
      if (!response) {
        // If project is from another user, we answer with the same message as an unexisting url path to not guess another users project id.
        return ctx.badRequest(`Error 404, ressource not found`);
      }
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      throw new ApplicationError();
    }
  },
  async update(ctx) {
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
      const rep = await strapi.db.query('api::feedback.feedback').findMany({
        where: {project: ctx.params.id},
        populate: { project: true }
      });
      rep.forEach(async (ele) => {
        await strapi.db.query('api::feedback.feedback').delete({
          where: {id: ele.id},
        })
      })
      const project = await strapi.db.query('api::project.project').delete({
        where: {
          id: ctx.params.id,
          user: ctx.state.user.id
        },
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
        populate: { feedbacks: true, members: true },
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      console.log(error.message);
      throw new ApplicationError();
    }
  },
}));
