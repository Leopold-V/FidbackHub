'use strict';

/**
 * feedback router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter("api::feedback.feedback");

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
    method: "POST",
    path: "/feedbacks/delete-many",
    handler: "api::feedback.feedback.deleteMany",
  }
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
