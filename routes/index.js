const router = require('koa-router')()

import {intercept} from '../utils/intercept'
// 引入controller

import login from '../controller/login'
import upload from '../controller/upload'
import user from '../controller/user'
import activity from '../controller/activity'
import association from '../controller/association'

// 中间件
import loginConfig from '../middleware/login'
import { uploadConfig } from '../middleware/uploads'

router.prefix('/api')

//路由拦截器
// router.use("*", intercept)

// 登陆
router.post('/login', login.login)

// 社团
router.get('/association/getAll', association.getAll)
router.post('/association/create', uploadConfig('assciation').single('file'), association.create)

// 学生
router.get('/user/get', loginConfig.loginCheck, user.get)
router.post('/user/update/:type', loginConfig.loginCheck, user.update)

// 文件上传
router.post('/upload/:type', uploadConfig('user').single('file'), upload.upload)

module.exports = router
