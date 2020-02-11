const _ = require('lodash');

module.exports = (app) => {
  app.remotes().phases.addBefore('invoke', 'add-request-to-options')
    .use((ctx, next) => {
      // const currentUserId = _.get(ctx, 'args.options.accessToken.userId');
      _.set(ctx, 'args.options.req', ctx.req);
      _.set(ctx, 'args.options.res', ctx.res);
      // if (currentUserId) {
      //   _.set(ctx, 'args.options.currentUserId', currentUserId);
      // }
      next();
    });
}