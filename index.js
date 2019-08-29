const joi = require('koa-joi-router');
const _ = require('lodash');

module.exports = (
  {
    resource = [],
    handlers = {},
    validates = {},
    middlewares = {},
    prefix,
    middleware,
  } = {},
) => {
  const resources = _.isArray(resource) ? resource : [resource];
  const routePrefix = _.join(
    _.flattenDeep(
      _.map(
        resources,
        (name, index) => (
          _.size(resources) === (index + 1)
            ? name
            : [
              name,
              `:${_.camelCase(`${name}Id`)}`,
            ]
        ),
      ),
    ),
    '/',
  );

  const router = joi();

  if (prefix) {
    router.prefix(prefix);
  }

  if (middleware) {
    router.use(middleware);
  }

  const defination = {
    show: {
      method: 'get',
      path: `/${routePrefix}/:id`,
    },
    index: {
      method: 'get',
      path: `/${routePrefix}`,
    },
    update: {
      method: 'patch',
      path: `/${routePrefix}/:id`,
    },
    upsert: {
      method: 'put',
      path: `/${routePrefix}/:id`,
    },
    destroy: {
      method: 'delete',
      path: `/${routePrefix}/:id`,
    },
    store: {
      method: 'post',
      path: `/${routePrefix}`,
    },
  };

  const routers = Object
    .keys(handlers)
    .map((index) => {
      if (index in defination) {
        const route = defination[index];

        return {
          ...route,
          path: route.path.replace(/\/+/, '/').replace(/\/([A-Za-z0-9]):(.+)$/, '/$1\\:$2'),
          handler: handlers[index],
          validate: validates[index],
          pre: middlewares[index],
        };
      }

      return false;
    })
    .filter(Boolean);

  return router
    .route(routers)
    .middleware();
};
