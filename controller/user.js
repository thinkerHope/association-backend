import { models } from '../models/index'

const User = models.user;

async function get(ctx) {
  // ctx.request.body
  const userList = await User.findAll();
  ctx.body = {
    code:0,
    data:{
      'userList': userList,
    },
    msg:'成功'
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
  const now = new Date()
  console.log('exists====',exists)
  if (exists) {
    dbData.update_time = now
    await User.update({
      ...dbData
    }, {
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
    userInfo = await User.create({
      ...dbData,
      create_time: now,
      update_time: now
    });
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