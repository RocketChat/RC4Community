import axios from 'axios';
import qs from 'qs';
import urlJoin from 'url-join';

export default async function rocketChatCallback(req, res){
	const {
		grant_type,
		code,
		redirect_uri
	} = req.body;
	const client_id =  process.env.ROCKETCHAT_CLIENT_ID;
	const client_secret = process.env.ROCKETCHAT_CLIENT_SECRET;
	try {
		const result = await getTokenResultFromRocketChat({
			grant_type,
			code,
			client_id,
			client_secret,
			redirect_uri
		});

		if(result.status == 200){
			const data = {...result.data};
			if(data.token_type === 'bearer')
				data.token_type = 'Bearer';
			res.json(data);
		} else {
			res.statusCode = result.status; 
			res.headers['Cache-Control'] = 'no-cache'
			res.send(result.data);
			res.end();
		}
	} catch(e) {
		console.error(e);
		res.statusCode = 500;
		res.send('Unexpected Error.');
		res.end();
	}
}

const getTokenResultFromRocketChat = async ({
	code,
	redirect_uri,
	grant_type,
	client_id,
	client_secret
} = {}) => {
	var data = qs.stringify({
		code,
		redirect_uri,
		grant_type,
		client_id,
		client_secret
	});
	var config = {
		method: 'post',
		url: urlJoin(process.env.ROCKETCHAT_URL,'/oauth/token'),
		headers: { 
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data : data
	};

	try {
		return await axios(config);
	} catch(e) {
		if(e.response)
			return  e.response;
		else
			throw e;
	}
}
