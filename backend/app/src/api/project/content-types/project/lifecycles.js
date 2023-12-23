"use strict";

module.exports = {
  async beforeUpdate(event) {
    let existing = await strapi.entityService.findOne("api::project.project", event.params.data.id);
    if (existing) {
      event.state = existing
    }
  },
  async afterUpdate(event) {
    const ctx = strapi.requestContext.get();
    const { result, params, state } = event;
    const listChange = findDiffForHistory(state, result);
    if (listChange.length > 0) {
      listChange.forEach(async ele => {
        await strapi.entityService.create('api::history.history', {
          data: { content_type: 'project', content_id: result.id, action: 'update', author: ctx?.state?.user,
          content: { attribut: ele.attribut, value: ele.value }, project: result.id },
        });
      });
    }
  },
  async afterCreate(event) {
    const ctx = strapi.requestContext.get();
    const { result } = event;
    console.log(result);
    try {
      const reponse = await strapi.entityService.create('api::history.history', {
          data: { content_type: 'project', content_id: result.id, action: 'create', author: ctx?.state?.user,
          content: { attribut: 'name', value: result.name }, project: result.id },
      })
    } catch (error) {
      console.log(error.message);
    }
  }
};

const findDiffForHistory = (oldProject, newProject) => {
  const listChange = [];

  if (oldProject.name !== newProject.name) {
    listChange.push({attribut: 'name', value: newProject.name});
  }
  if (oldProject.description !== newProject.description) {
    listChange.push({attribut: 'description', value: newProject.description});
  }
  if (oldProject.website_url !== newProject.website_url) {
    listChange.push({attribut: 'website_url', value: newProject.website_url});
  }
  if (oldProject.github_url !== newProject.github_url) {
    listChange.push({attribut: 'github_url', value: newProject.github_url});
  }

  return listChange;
};
