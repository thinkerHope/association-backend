import { models } from '../models/index'

const Association = models.association;

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


export default {
  get,
  getAll
}