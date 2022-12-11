const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;

module.exports = (plugin) => {

    /*******************************  CUSTOM CONTROLERS  ********************************/
    plugin.controllers.user.updateLoggedInUser = async (ctx) => {
        try {
          if (ctx.request.body.data.username === "" || !ctx.request.body.data.username) {
            throw new Error();
          }
          const response = await strapi.query('plugin::users-permissions.user').update({
            where: {id: ctx.request.body.data.userid},
            data: ctx.request.body.data
          });
          return {data: {id: response.id, attributes: {...response}}, meta: {}};
        } catch (error) {
          throw new ApplicationError('Something went wrong');
        }
    }

    /*******************************  CUSTOM ROUTES  ********************************/
    plugin.routes["content-api"].routes.push(
      {
        method: "POST",
        path: "/users/updateLoggedInUser",
        handler: "user.updateLoggedInUser",
        config: {
          prefix: "",
          policies: []
        }
      }
    )

    return plugin;
  };
