import { models } from '../models/index';
import wxconfig from '../config/wxapp';
import redisClient from '../service/redis';
import get3rdSkey from '../utils/getSessionKey';

const User = models.user;

const { appid, appSecret } = wxconfig;

const REDIS_EXPIRES = 1 * 3600;

async function login(ctx) {
  const { code } = ctx.request.body
  const skeyRes = await get3rdSkey(code, appid, appSecret);
  const { skey, openid ,session_key } = skeyRes
  if (skey) {
    const result = await redisClient.set(skey, JSON.stringify({ session_key, openid }))
    await redisClient.expire(skey, REDIS_EXPIRES)
    // 校验skey: const res = await redisClient.get(ctx.request.body._3rd_session)
    if (result) {
      ctx.body = {
        retcode: 0,
        data: {
          userid: openid,
          skey: skeyRes.skey
        }
      }
    } else {
      ctx.body = {
        retcode: -1,
        message: 'redis发生错误'
      }
    }
  } else {
    ctx.body = skeyRes
  }
}

export default {
  login,
}