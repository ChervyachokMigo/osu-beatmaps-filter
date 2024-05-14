const path = require('path');
const { osu_db_load, beatmap_property, osu_db_find_beatmaps, collection_db_save, collection_db_load } = require("osu-tools");
const { osu_path } = require('./config.js');


const beatmap_props = [
	beatmap_property.beatmap_md5,
	beatmap_property.gamemode,
	beatmap_property.number_sliders,
	beatmap_property.number_hitcircles
];

const osu_db_beatmaps = osu_db_load(path.join(osu_path, 'osu!.db'), beatmap_props);

const beatmaps_sliders = [];

const offset_list = [
	{s: 0, len: 1},
	{s: 1, len: 1},
	{s: 1, len: 2},
	{s: 3, len: 2},
	{s: 100, len: 1}
]

for (let i = 0; i <= 100; i++){
	const offset_item = offset_list.find( x => i >= x.s && i < x.s + x.len );
	const offset_len = offset_item ? offset_item.len : 5;

	if (typeof offset_item !== 'undefined' && offset_item.s !== i) {
		continue;
	}

	if (typeof offset_item === 'undefined') {
		if (i % offset_len !== 0){
			continue;
		}
	}

	const beatmaps = osu_db_find_beatmaps(osu_db_beatmaps, x => {
		const sliders_percent = (x.number_sliders / (x.number_sliders + x.number_hitcircles) || 0) * 100;
		return x.gamemode == 'mania' && 
		sliders_percent >= i && 
		sliders_percent < (i + offset_len)
	}
	);
	beatmaps_sliders.push({name: `!mania sliders ${i}%-${i>=100 ? 100 : i+offset_len}%`, beatmaps_md5: beatmaps.map( x => x.beatmap_md5) });
}

console.log(beatmaps_sliders.map( x => x.name))

const collections = collection_db_load( path.join(osu_path, 'collection.db'));

collections.collections = collections.collections.concat(beatmaps_sliders);

collection_db_save ( collections, 'collection.db' );