import { models } from '../models/index'
import { nameRule } from '../middleware/uploads'

const Association = models.association;
const User = models.user;

async function get(ctx) {
  // console.log(ctx.request)
  const associationList = await Association.findAll();
  ctx.body = {
    retcode: 0,
    data: {
			
    },
  }
}

async function getAll(ctx) {
	const types = [
		{
			id: 0,
			type: 'charity',
			showName: '公益类',
		},
		{
			id: 1,
			type: 'sports',
			showName: '体育类',
		},
		{
			id: 2,
			type: 'tradition',
			showName: '传统类',
		},
		{
			id: 3,
			type: 'music',
			showName: '音乐类',
		},
		{
			id: 4,
			type: 'dance',
			showName: '舞蹈类',
		},
		{
			id: 5,
			type: 'literature',
			showName: '文学类',
		},
		{
			id: 6,
			type: 'arts',
			showName: '美术类',
		},
		{
			id: 7,
			type: 'technology',
			showName: '科技类',
		},
		{
			id: 8,
			type: 'academic',
			showName: '学术类',
		},
		{
			id: 9,
			type: 'language',
			showName: '语言类',
		},
	]

	await Promise.all(
		types.map(async item => {
			const { type } = item
			Association.findAll({
				where: {
					type
				}
			})
			.then(res => {
				if (res && res.length) {
					item.list = [...res]
				}
			})
			.catch(err => {
				console.log('err', err);
			})
		})
	)
	
	ctx.body = {
		retcode: 0,
		data: {
			types
		}
	}
}

async function create(ctx) {
	const UID = require('uuid').v1()
	const { 
		userid = '',
		association_name, 
		association_desc, 
		association_type, 
		association_academy, 
		association_qq, 
	} = ctx.req.body;
	const url = nameRule() + ctx.req.file.filename;
	const now = new Date()
	const dbData = {
		associationid: UID,
		name: association_name,
		type: association_type,
		academy: association_academy,
		qq: association_qq,
		// identity: 0-创建者（默认社长，权限最高）1-普通干事
		members: JSON.stringify([{ userid, identity: 0 }]),
		desc: association_desc,
		logo: url,
		create_time: now,
		update_time: now,
	}

	const exists = await Association.findOne({
    where: {
      name: association_name,
    },
	});

	if (exists) {
		return ctx.body = {
			retcode: '-1',
			message: '该社团名已被占用'
		}
	}

	const associationInfo = await Association.create(dbData);
	const joinedAssociations = JSON.stringify({ associationid: associationInfo.associationid })
	if (associationInfo) {
		User.update({ 
			joinedAssociations,
		}, {
			where: {
				userid
			}
		});
	}

	
	ctx.body = {
    retcode: 0,
    data: associationInfo,
  }
}

export default {
  get,
	getAll,
	create,
}