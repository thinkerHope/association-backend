import { models } from '../models/index';
import wxconfig from '../config/wxapp';
import redisClient from '../service/redis';
import get3rdSkey from '../utils/getSessionKey';

const baseUrl = 'http://localhost:3001';

const User = models.user;

const { appid, appSecret } = wxconfig;

const REDIS_EXPIRES = 2 * 10 * 3600;

async function login(ctx) {
  const { code } = ctx.request.body
  const skeyRes = await get3rdSkey(code, appid, appSecret);
  const { skey, openid ,session_key } = skeyRes
  if (skey) {
    const result = await redisClient.set(skey, JSON.stringify({ session_key, openid }))
    await redisClient.expire(skey, REDIS_EXPIRES)
    // 校验skey: const res = await redisClient.get(ctx.request.body._3rd_session)
    if (result) {
      // 根据openid判断用户是否已经完善过信息
      const exists = await User.findOne({
        where: {
          userid: openid
        },
      });

      const retData = {
        userid: openid,
        skey: skeyRes.skey,
      }

      if (exists) {
        exists.dataValues.avatarUrl = `${baseUrl}${exists.dataValues.avatar}`
        retData.exists = exists.dataValues
      }

      ctx.body = {
        retcode: 0,
        data: retData
      }
    } else {
      ctx.body = {
        retcode: -1,
        message: 'redis发生错误'
      }
    }
  }
}

export default {
  login,
}