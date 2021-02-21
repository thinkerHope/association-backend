import redis from 'redis';
import { promisify } from 'util';
import config from '../config/config';

const redisConfig = config.redis;

const option = {
	...redisConfig,
	retry_strategy(options) {
		if (options.error && options.error.code === 'ECONNREFUSED') {
			// redis连接失败
			return new Error('The server refused the connection');
		}
		if (options.total_retry_time > 1000 * 60 * 60) {
			// End reconnecting after a specific timeout and flush all commands
			// with a individual error
			return new Error('Retry time exhausted');
		}
		if (options.attempt > 10) {
			// End reconnecting with built in error
			return undefined;
		}
		// reconnect after
		return Math.min(options.attempt * 100, 3000);
	},
};

// 要建立两个clinet, 一个是clinet来处理数据，一个来订阅，不能用同一个不然会报错
const client = redis.createClient(option);

const subscriber = redis.createClient(option);

client.on('error', (err) => {
	console.log(`redis error: ${JSON.stringify(err)}`);
});

export default {
	set: promisify(client.set).bind(client),
	get: promisify(client.get).bind(client),
	hset: promisify(client.hset).bind(client),
	hget: promisify(client.hget).bind(client),
	hgetall: promisify(client.hgetall).bind(client),
	hdel: promisify(client.hdel).bind(client),
	zadd: promisify(client.zadd).bind(client),
	zcount: promisify(client.zcount).bind(client),
	zrange: promisify(client.zrange).bind(client),
	zrank: promisify(client.zrange).bind(client),
	zrem: promisify(client.zrem).bind(client),
	zcard: promisify(client.zcard).bind(client),
	expire: promisify(client.expire).bind(client),
	del: promisify(client.del).bind(client),
	setnx: promisify(client.setnx).bind(client),
	llen: promisify(client.llen).bind(client),
	lpush: promisify(client.lpush).bind(client),
	lrange: promisify(client.lrange).bind(client),
	lrem: promisify(client.lrem).bind(client),
	rpush: promisify(client.rpush).bind(client),
	ltrim: promisify(client.ltrim).bind(client),
	sadd: promisify(client.sadd).bind(client),
	srem: promisify(client.srem).bind(client),
	smembers: promisify(client.smembers).bind(client),
	publish: subscriber.publish.bind(subscriber),
	subscribe: subscriber.subscribe.bind(subscriber),
	unsubscribe: subscriber.unsubscribe.bind(subscriber),
	on: (event, handler) => {
		subscriber.on(event, handler);
	},
};

