'use strict';

/**
 * rating router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter("api::rating.rating");

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
    path: "/verify-ratings",
    handler: "api::rating.rating.verifyRating",
  }
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
