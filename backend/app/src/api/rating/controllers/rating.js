"use strict";
/**
 * rating controller
 */
const dayjs = require('dayjs');
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const { createCoreController } = require("@strapi/strapi").factories;
const { schemaCreate } = require('../content-types/rating/validation');

module.exports = createCoreController("api::rating.rating", ({ strapi }) => ({
  async create(ctx) {
    const { error } = schemaCreate.validate(ctx.request.body.data);
    if (error) {
      return ctx.badRequest(error.details[0].message, {...error.details[0]})
    }
    try {
      const project = await strapi.db.query("api::project.project").findOne({
        where: { api_key: ctx.request.body.data.projectToken },
        populate: { ratings: true },
      });
      if (!project) {
        throw new Error("No project found with this api key.");
      }
      const response = await strapi.db.query("api::rating.rating").create({
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
  async find(ctx) {
    try {
      const projects = await strapi.db.query("api::project.project").findMany({
        where: { user: ctx.state.user.id },
        populate: { user: true },
      });
      const response = await strapi.db.query("api::rating.rating").findMany({
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
  async verifyRating(ctx) {
    try {
      const response = await strapi.db.query("api::rating.rating").findMany({
        where: {
          user_ipv4: ctx.request.ip,
          project: {
            api_key: ctx.query.key,
          }
        },
        populate: { project: true },
      });
      const reponseFilteredDate = response.filter((ele) => dayjs(ele.createdAt).format("YYYY-MM-DD").toString() === dayjs(new Date()).format("YYYY-MM-DD").toString());
      return reponseFilteredDate.length > 0;
    } catch (error) {
      console.log(error);
      throw new ApplicationError();
    }
  },
}));
