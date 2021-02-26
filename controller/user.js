import { models } from '../models/index'

const User = models.user;

async function get(ctx) {
  const exists = await User.findOne({
    where: {
      userid
    },
  });

  if (exists) {
    return ctx.body = {
      retcode: 0,
      data: {
        
      },
    }
  } else {
    ctx.body = {
      retcode: -1,
      message: '用户不存在'
    }
  }
  
}

async function update(ctx) {
  const { userid, userclass, username, sno, academy } = ctx.request.body;
  const { type } = ctx.params;

  const exists = await User.findOne({
    where: {
      userid
    },
  });

  let dbData;
  let userInfo;

  switch (type) {
    case 'basic':
      dbData = {
        userid,
        userclass, 
        username, 
        sno, 
        academy,
        isInfoComplete: 0
      }
      break;
    
    default:
      break;
  }

  if (exists) {
    await User.update(dbData, {
      where: {
        userid
      },
    });
    return ctx.body = {
      retcode: 0,
      data: { 
        userInfo: {
          ...exists.dataValues,
          ...dbData
        }
      },
      message: '信息更新成功',
    }
  } else {
    userInfo = await User.create(dbData);
  }

  ctx.body = {
    retcode: 0,
    data: { userInfo },
    message: '信息完善成功'
  };
}

export default {
  get,
  update,
}