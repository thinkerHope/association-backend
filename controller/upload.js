
import fs from 'fs'
import { nameRule } from '../middleware/uploads'
import { models } from '../models/index'

const User = models.user;

// 图片上传
async function upload(ctx) {
  const { type } = ctx.params;
  const { userid = '' } = ctx.req.body;
  const url = nameRule('user') + ctx.req.file.filename;
  // (若上一步需上传阿里等图床时需要读取本地文件)上传后  是否成功  删除文件
  // fs.unlinkSync(url);
  // 补全用户信息
  const exists = await User.findOne({
    where: {
      userid
    },
  });
  console.log('exists===>', exists)

  const dbData = { avatar: `/${url}`, userid }

  if (exists) {
    await User.update(dbData, {
      where: {
        userid
      },
    });
  } else {
    return ctx.body = {
      retcode: 3005,
      message: 'avatar upload fail',
    }
  }

  ctx.body = {
    retcode: 0,
    data: `/${url}`,
    message: 'avatar upload success',
  }
}

export default {
  upload,
}