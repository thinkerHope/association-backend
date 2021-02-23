import redisClient from '../service/redis'

// 校验登录态的中间件
const loginCheck = async (ctx, next) => {
	// 查询数据库，判断_3rd_session是否存在且有效
	const res = await redisClient.get(ctx.request.body.skey)
	console.log('loginCheck res', res)
	if (res) {
		ctx.request.body.userid = JSON.parse(res).openid
		await next()
	} else {
		ctx.body = "未登录!"
	}
}

export default {
	loginCheck,
}