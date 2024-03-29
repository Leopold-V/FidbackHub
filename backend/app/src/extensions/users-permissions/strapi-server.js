const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;

module.exports = (plugin) => {
    /*******************************  CUSTOM CONTROLERS  ********************************/
    plugin.controllers.user.updateLoggedInUser = async (ctx) => {
        try {
          if (ctx.request.body.data.username === "" || !ctx.request.body.data.username) {
            throw new Error();
          }
          // OPERATION DISABLED BECAUSE NOT NECESSARY FOR NOW
          /*
          const response = await strapi.db.query('plugin::users-permissions.user').update({
            where: {id: ctx.state.user.id},
            data: ctx.request.body.data
          });
          */
          return {data: {id: response.id, attributes: {...response}}, meta: {}};
        } catch (error) {
          console.log(error);
          throw new ApplicationError('Something went wrong');
        }
    }

    plugin.controllers.user.findUserWithEmail = async (ctx) => {
      try {
        const response = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: {email: ctx.params.email},
        });
        if (!response) {
          return ctx.badRequest(`No user found`);
        }
        return {data: {id: response.id, attributes: {...response}}, meta: {}};
      } catch (error) {
        console.log(error);
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
      },
      {
        method: "GET",
        path: "/users/findUserWithEmail/:email",
        handler: "user.findUserWithEmail",
        config: {
          prefix: "",
          policies: []
        }
      }
    )

    return plugin;
  };
