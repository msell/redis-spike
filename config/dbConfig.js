var redisAdapter = require('sails-redis');

module.exports = {
    adapters: {
        'default': redisAdapter,
        redis: redisAdapter
    },
    connections: {
        redis: {
            adapter: 'redis',
            host: 'directory.redis.cache.windows.net',
            port: 6379,
            password: process.env.REDIS_ACCESS_KEY
        },
    },
    defaults: {
        migrate: 'alter'
    },
    options: {
        parser: 'javascript',
        return_buffers: false,
        detect_buffers: false,
        socket_nodelay: true,
        no_ready_check: false,
        enable_offline_queue: true
    }
};