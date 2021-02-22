import { models } from '../models/index'

const User = models.user;

async function get(ctx) {
  // ctx.request.body
  const userList = await User.findAll();
  ctx.body = {
    code:0,
    data:{
      'userList':userList,
    },
    msg:'成功'
  }
}

async function update(ctx) {

}

export default {
  get,
  update,
}