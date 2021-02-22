const router = require('koa-router')()

import {intercept} from '../utils/intercept'
// 引入controller
import {uploadConfig} from '../utils/uploads'

import login from '../controller/login'
import upload from '../controller/upload'
import user from '../controller/user'
import activity from '../controller/activity'
import association from '../controller/association'

router.prefix('/api')

//路由拦截器
// router.use("*", intercept)

// 登陆
router.post('/login', login.login)

// 社团
router.get('/association/getAll', association.getAll)

// 文件上传
router.post('/upload/:type', uploadConfig.single('file'), upload.upload)

module.exports = router
