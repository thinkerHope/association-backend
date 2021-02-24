
import multer from 'koa-multer'
import md5 from 'md5-node'
import path from 'path'
// 文件上传配置
// 文件夹名称（日期）
const dirDate = new Date().toJSON().substr(0, 10).replace(/[-T]/g, '');
let _dirname = ''
// 加载配置
export const uploadConfig = (dirname) => {
  _dirname = dirname
  return multer({ 
    storage: multer.diskStorage({
      // 文件保存路径
      destination: path.resolve(__dirname, `../public/uploads/${dirname}/${dirDate}`),
      // 修改文件名称
      filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split(".");
        cb(null, md5(Math.round(new Date().getTime() / 1000)) + "." + fileFormat[fileFormat.length - 1]);
      }
    }),
  })
}

// 文件命名规则
export const nameRule = () => `uploads/${_dirname}/${dirDate}/`