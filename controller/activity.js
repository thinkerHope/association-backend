import { models } from '../models/index'

const Activity = models.user;

async function search(ctx) {
  // console.log(ctx.request)
  var userList = await User.findAll();
  ctx.body = {
    code:0,
    data:{
      'userList':userList,
    },
    msg:'成功'
  }
}


export default {
  search,
}