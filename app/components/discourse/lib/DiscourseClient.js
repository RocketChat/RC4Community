import axios from 'axios';

class DiscourseClient {
	constructor(host, {
		isClient,
		apiKey,
		apiUserName
	}) {
		if (isClient && (apiKey || apiUserName)) {
			throw new Error("Cannot use api key on client side.");
		}
		this.host = host;
		this.isClient = isClient;
		if (!isClient) {
			this.apiKey = apiKey;
			this.apiUserName = apiUserName;
		}
		this.api = axios.create({
			baseURL: host,
			headers: {
				Accept: 'application/json'
			}
		})
	}

	serverOnly(name){
		if (this.isClient) {
			throw new Error(`${name} can only be called on server side.`);
		}
	}

	async getLatestTopics() {
		const response = await this.api.get('/latest?order=created')
		return response.data;
 	}

	async getTopTopics() {
		const response = await this.api.get('/top?order=created')
		return response.data;
	}

	async getUnsolvedTopics() {
		const q = new URLSearchParams();
		q.append('q','status:unsolved order:created max_posts:10')
		const response = await this.api.get(`/search?${q}`)
		return response.data;
	}

	async getSolvedTopics() {
		const q = new URLSearchParams();
		q.append('q', 'status:solved order:created max_posts:10')
		const response = await this.api.get(`/search?${q}`)
		return response.data;
	}
}

export default DiscourseClient;
