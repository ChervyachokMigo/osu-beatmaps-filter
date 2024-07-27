const axios = require('axios');

module.exports = async ({ md5 }) => {
	const api_key = null
	if (!api_key) {
		throw new Error('no osu api key');
	}

	const url = `https://osu.ppy.sh/api/get_beatmaps?k=${api_key}&h=${md5}&limit=1`;
	const res = await axios( url );
	
	if ( res && res.data && typeof res.data == 'object' && res.data.length > 0 ) {
		return res.data.shift();
	}

	console.error( 'no beatmap info on bancho by md5', md5 );
	return null;
}