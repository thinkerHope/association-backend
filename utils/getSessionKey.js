import axios from 'axios';
const crypto = require('crypto');

function encryptSha1(data) {
	return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

async function getSessionKey (code, appid, appSecret) {
	const url = 'https://api.weixin.qq.com/sns/jscode2session';

	const res = await axios({
		url,
		method: 'GET',
		params: {
			appid: appid,
			secret: appSecret,
			js_code: code,
			grant_type: 'authorization_code'
		}
	});
	console.log('getSessionKey res ========>', res.data);
	return res.data;
}

async function get3rdSkey(code, appid, appSecret) {
	const { openid, session_key, errcode } = await getSessionKey(code, appid, appSecret);
	
	if (!openid || !session_key || errcode) {
		return {
			retcode: -2,
			message: '返回数据字段不完整'
		}
	} 
	// sky = encryptSha1(session_key)
	return {
		retcode: 0,
		skey: encryptSha1(session_key),
		openid,
		session_key,
	};
}

module.exports = get3rdSkey;