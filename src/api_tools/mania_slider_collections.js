
const { osu_db_load, beatmap_property, osu_db_find_beatmaps, 
	collection_db_save, collection_db_load } = require("osu-tools");

module.exports = (osu_db_path, collection_path, output_path) => {

	const beatmap_props = [
		beatmap_property.beatmap_md5,
		beatmap_property.gamemode,
		beatmap_property.number_sliders,
		beatmap_property.number_hitcircles
	];

	const osu_db_beatmaps = osu_db_load(osu_db_path, beatmap_props);

	const beatmaps_sliders = [];

	const offset_list = [
		{s: 0, len: 1},
		{s: 1, len: 2},
		{s: 3, len: 2},
		{s: 100, len: 1}
	];

	const default_len = 5;

	const add_zero = (i) => i < 10 ? `00`+i : i >= 10 || i <=99 ? '0'+ i : i;

	for (let i = 0; i <= 100; i++){
		const offset_item = offset_list.find( x => i >= x.s && i < x.s + x.len );
		const offset_len = offset_item ? offset_item.len : default_len;

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
		beatmaps_sliders.push({name: `!mania sliders ${add_zero(i)}%-${i>= 100 ? 100 : add_zero(i+offset_len)}%`, beatmaps_md5: beatmaps.map( x => x.beatmap_md5) });
	}

	const collections = collection_db_load( collection_path );

	const collection_to_save = [];

	for (let x of beatmaps_sliders) {
		const idx = collections.collections.findIndex( v => v.name === x.name);
		if (idx > -1){
			const new_beatmaps = x.beatmaps_md5.filter( beatmap => collections.collections[idx].beatmaps_md5.indexOf(beatmap) === -1);
			if (new_beatmaps && new_beatmaps.length > 0) {
				collection_to_save.push({name: x.name, beatmaps_md5: new_beatmaps });
			}
		} else {
			collection_to_save.push(x);
		}
	}

	collections.collections = collections.collections.concat(collection_to_save);

	collection_db_save ( collections, output_path );

}