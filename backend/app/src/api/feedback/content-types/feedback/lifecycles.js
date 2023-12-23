"use strict";

module.exports = {
  async afterCreate(event) {
    const ctx = strapi.requestContext.get();
    const { result } = event;
    try {
      await strapi.entityService.create('api::history.history', {
          data: { content_type: 'feedback', content_id: result.id, action: 'create', author: ctx?.state?.user,
          content: { attribut: 'title', value: result.title }, project: result.project.id },
      })
    } catch (error) {
      console.log(error.message);
    }
  },
  async beforeUpdate(event) {
    let existing = await strapi.entityService.findOne("api::feedback.feedback", event.params.data.id);
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
          data: { content_type: 'feedback', content_id: result.id, action: 'update', author: ctx?.state?.user,
          content: { attribut: ele.attribut, value: ele.value }, project: params.data.project.id },
        });
      });
    }
  },
};

const findDiffForHistory = (oldFeedback, newFeedback) => {
  const listChange = [];
  if (oldFeedback.state !== newFeedback.state) {
    listChange.push({attribut: 'state', value: newFeedback.state});
  }
  if (oldFeedback.status !== newFeedback.status) {
    listChange.push({attribut: 'status', value: newFeedback.status});
  }
  if (oldFeedback.type !== newFeedback.type) {
    listChange.push({attribut: 'type', value: newFeedback.type});
  }
  return listChange;
};
