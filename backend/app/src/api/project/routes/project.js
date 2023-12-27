'use strict';

/**
 * project router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter("api::project.project");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "GET",
    path: "/project-user",
    handler: "api::project.project.projectUser",
  },
  {
    method: "PUT",
    path: "/projects/:id/leave",
    handler: "api::project.project.updateMember",
  },
  {
    method: "POST",
    path: "/projects/findwithtoken",
    handler: "api::project.project.findOneWithApiKey",
  }
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
