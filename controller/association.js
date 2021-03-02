import { models } from '../models/index'
import { nameRule } from '../middleware/uploads'
import Sequelize from 'sequelize'

const Op = Sequelize.Op;

const Association = models.association;
const User = models.user;

const baseUrl = 'http://localhost:3001';

async function get(ctx) {
  // console.log(ctx.request)
	const { userid } = ctx.request.body;
	const user = await User.findOne({
		where: {
			userid
		}
	})
	const associations = await user.getAssociations();

  ctx.body = {
    retcode: 0,
    data: {
			associations: associations.map(i => i.dataValues)
    },
  }
}

async function getOne(ctx) {
	const { userid, name } = ctx.request.body;

	if (!userid || !name) {
		return ctx.body = {
			retcode: -1,
			message: '参数缺失'
		}
	}
	const user = await User.findOne({
		where: {
			userid
		}
	})
	const res = await user.getAssociations({
		where: {
			name: {
				[Op.eq]: name
			}
		}
	})
	if (res && res.length) {
		ctx.body = {
			retcode: 0,
			data: {
				...res[0].dataValues
			},
		}
	} else {
		ctx.body = {
			retcode: -1,
			message: '社团不存在'
		}
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
	const url = nameRule('association') + ctx.req.file.filename;

	const dbData = {
		id: UID,
		name: association_name,
		type: association_type,
		academy: association_academy,
		qq: association_qq,
		desc: association_desc,
		logo: `${baseUrl}/${url}`,
	}

	const exists = await Association.findOne({
    where: {
      name: association_name,
    },
	});

	if (exists) {
		return ctx.body = {
			retcode: '-1',
			message: `association ${association_name} already exists`
		}
	}

	const creator = await User.findOne({
    where: {
      userid,
    },
	});
	const AssociationCreated = await Association.create(dbData);
	await AssociationCreated.addUser(creator, { through: { identity: 0 }});
	
	ctx.body = {
    retcode: 0,
    data: AssociationCreated.dataValues,
  }
}

export default {
  get,
	getAll,
	getOne,
	create,
}

