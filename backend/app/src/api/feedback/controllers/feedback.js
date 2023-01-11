"use strict";
/**
 * feedback controller
 */
const dayjs = require('dayjs');
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const { createCoreController } = require("@strapi/strapi").factories;
const { schemaCreate, schemaUpdate } = require('../content-types/feedback/validation');

module.exports = createCoreController("api::feedback.feedback", ({ strapi }) => ({
  async create(ctx) {
    console.log(ctx.request.body);
    const { error } = schemaCreate.validate(ctx.request.body.data);
    if (error) {
      return ctx.badRequest(error.details[0].message, {...error.details[0]})
    }
    try {
      const project = await strapi.db.query("api::project.project").findOne({
        where: { api_key: ctx.request.body.data.projectToken },
        populate: { feedbacks: true },
      });
      if (!project) {
        throw new Error("No project found with this api key.");
      }
      const response = await strapi.db.query("api::feedback.feedback").create({
        data: { ...ctx.request.body.data, project: project.id },
        populate: { project: true },
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
  async findOne(ctx) {
    try {
      const project = await strapi.db.query("api::project.project").findOne({
        where: {
          feedbacks: {
            id: {
              $contains: ctx.params.id
            }
          },
          user: ctx.state.user.id
        },
        populate: { feedbacks: true, user: true },
      });
      if (!project) {
        // If project is from another user, we answer with the same message as an unexisting url path to not guess other users feedback id.
        return ctx.badRequest(`Error 404, ressource not found`);
      }
      const response = await strapi.db.query('api::feedback.feedback').findOne({
        where: {id: ctx.params.id },
        populate: { project: true },
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      console.log(error.message);
      throw new ApplicationError(error.message);
    }
  },
  async find(ctx) {
    try {
      const projects = await strapi.db.query("api::project.project").findMany({
        where: { user: ctx.state.user.id },
        populate: { user: true },
      });
      const response = await strapi.db.query("api::feedback.feedback").findMany({
        where: {
          project: {
            id: {
              $in: projects.map((ele) => ele.id),
            },
          },
        },
        populate: { project: true },
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
  async update(ctx) {
    const { error } = schemaUpdate.validate(ctx.request.body.data);
    if (error) {
      return ctx.badRequest(error.details[0].message, {...error.details[0]})
    }
    try {
      const project = await strapi.db.query("api::project.project").findOne({
        where: {
          feedbacks: {
            id: {
              $contains: ctx.params.id
            },
            status: "Open"
          },
          user: ctx.state.user.id
        },
        populate: { feedbacks: true, user: true },
      });
      if (!project) {
        // If project is from another user, we answer with the same message as an unexisting url path to not guess other users feedback id.
        throw new ApplicationError(`Error 404, ressource not found`);
      }
      const response = await strapi.db.query('api::feedback.feedback').update({
        where: {id: ctx.params.id },
        data: ctx.request.body.data,
      });
      return {data: {id: response.id, attributes: {...response}}, meta: {}};
    } catch (error) {
      throw new ApplicationError(error.message);
    }
  },
  async deleteMany(ctx) {
    try {
      const feedbacks = await strapi.db.query("api::feedback.feedback").findMany({
        where: {
          id: [...ctx.request.body.data],
          project: {
            user: ctx.state.user
          }
        },
        populate: { project: true, user: true },
      });
      if (!feedbacks) {
        throw new ApplicationError(`Error 404, ressource not found`);
      }
      feedbacks.forEach(async (feedback) => {
        await strapi.db.query('api::feedback.feedback').delete({
          where: {id: feedback.id},
        })
      })
      return {data: {id: [...ctx.request.body.data], attributes: {...feedbacks}}, meta: {}};
    } catch (error) {
      console.log(error);
      throw new ApplicationError();
    }
  },
}));
