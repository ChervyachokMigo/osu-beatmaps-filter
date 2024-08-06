
const { osu_db_load, all_beatmap_properties, osu_db_save } = require("osu-tools");

module.exports = (input_path, output_path) => {
	const osu_db_beatmaps = osu_db_load(input_path, all_beatmap_properties);

	console.log('find zero starrates');

	osu_db_beatmaps.beatmaps.forEach( ({star_rating_ctb, star_rating_std, star_rating_mania, star_rating_taiko}, i, arr) => {

		const found = [
			...star_rating_std.filter( v => v.stars == 0 ),
			...star_rating_mania.filter( v => v.stars == 0 ),
			...star_rating_ctb.filter( v => v.stars == 0 ),
			...star_rating_taiko.filter( v => v.stars == 0 ),
		];

		if (found.length > 0) {
			arr[i].star_rating_std = [];
			arr[i].star_rating_mania = [];
			arr[i].star_rating_ctb = [];
			arr[i].star_rating_taiko = [];
		}

	})

	osu_db_save(osu_db_beatmaps, output_path);
}
