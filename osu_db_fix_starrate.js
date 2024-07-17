const path = require('path');
const { osu_db_load, beatmap_property, osu_db_find_beatmaps, collection_db_save, collection_db_load, all_beatmap_properties, osu_db_save } = require("osu-tools");


const osu_path = path.join('./livo4');
const save_path = path.join('./livo4_new', 'osu!.db');

const osu_db_beatmaps = osu_db_load(path.join(osu_path, 'osu!.db'), all_beatmap_properties);

let count = 0;
let all_count = 0;

console.log('find zero starrates')

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

	count += found.length
})

console.log(count)

osu_db_save(osu_db_beatmaps, save_path);