module.exports = {
  async afterCreate(event) {
    const ctx = strapi.requestContext.get();
    const { result } = event;
    console.log(result);
    try {
      const feedback = await strapi.db.query('api::feedback.feedback').findOne({
        where: {id: result.feedback.id },
        populate: { project: true },
      });
      console.log(feedback);
      await strapi.entityService.create('api::history.history', {
          data: { content_type: 'comment', content_id: result.id, action: 'create', author: ctx?.state?.user,
          content: { attribut: 'text', value: result.content }, project: feedback.project.id },
    })
    } catch (error) {
      console.log(error.message);
    }
  }
};
