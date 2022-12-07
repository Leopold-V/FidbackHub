'use strict';
/**
 * project controller
 */
const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({ strapi }) => ({
  async findOne(ctx) {
    const response = await super.findOne(ctx);
    if (ctx.state.user.id !== response.data.attributes.user.data.id) {
      throw new ApplicationError('Something went wrong', { foo: 'bar' });
    }
    console.log(response);
    return response;
  }
}));
