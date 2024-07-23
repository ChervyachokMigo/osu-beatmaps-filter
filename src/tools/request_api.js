const api_host = 'http://localhost:9002/'

module.exports = {
	GET: async (action_name, request_args) => {
		return new Promise ( (res ,rej) => 
			fetch(api_host + 'action=' + action_name + '?' + 
				Object.entries(request_args)
				.map( ([x, y]) => `${encodeURIComponent(x)}=${encodeURIComponent(y)}` )
				.join('&'))
			.then( response => response.json())
			.then( data => res (data) )
			.catch(error => {
				console.error(error);
				rej({ error });
			})
		);
	},

	POST: async (action_name, request_args) => {
		return new Promise ( (res ,rej) => 
			fetch(api_host + 'action=' + action_name, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request_args)
			}).then( response => response.json())
			.then( data => res (data) )
			.catch(error => {
				console.error(error);
				rej({ error });
			})
		);
	},
}