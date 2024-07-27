const { collection_db_load, get_collections_detailed, beatmap_property, osu_db_load } = require('osu-tools');
const path = require('path');
const fs = require('fs');

const beatmap_props = [
	beatmap_property.beatmap_md5,
	beatmap_property.beatmapset_id,
	beatmap_property.gamemode,
	beatmap_property.title,
	beatmap_property.artist,
    //beatmap_property.creator,
    beatmap_property.difficulty,
    //beatmap_property.beatmap_id,
];


const founded_missing = (input_path, osu_db_path)  => {
	const missed_md5s = fs.readFileSync(input_path, {encoding: 'utf8'}).split('\n');

	const osu_db_beatmaps = osu_db_load(osu_db_path, beatmap_props);

	const founded_beatmaps = [];
	const missed_beatmaps = [];
	const names = [];

	for (const missed_md5 of missed_md5s) {
		let founded = false;

		for (const beatmap of osu_db_beatmaps.beatmaps) {
			if (missed_md5 === beatmap.beatmap_md5) {
				
				if (beatmap.beatmapset_id == -1) {
					names.push(`${missed_md5}: (${beatmap.gamemode}) ${beatmap.artist} - ${beatmap.title} [${beatmap.difficulty}]`);
				} else {
					founded_beatmaps.push(beatmap.beatmapset_id);
					founded = true;
				}
				
			} 
		}

		if (!founded) {
			missed_beatmaps.push(missed_md5);
		}
	}

	return {founded_beatmaps, missed_beatmaps, names};
}

const save = (filename, array) => fs.writeFileSync(filename, 
	Array.from(new Set(array)).join('\n'), { encoding: 'utf8'} );

const missed = fs.readFileSync('missed.beatmaps_2.txt', {encoding: 'utf8'}).split('\n');
const names = new Set(fs.readFileSync('names.txt', {encoding: 'utf8'}).split('\n').map( x => x.slice(0, 32)));

save ('missed_3.txt', missed.filter( x => !names.has(x)));

/*
const userdata_1 = 'F:\\node_js_stuff\\node_projects\\osu-beatmaps-filter\\userdata\\nnaoi\\db2';
const userdata_2 = 'F:\\node_js_stuff\\node_projects\\osu-beatmaps-filter\\userdata\\nnaoi\\db3';

const res = founded_missing('missed.beatmaps.txt', path.join(userdata_1, 'osu!.db'));
save ('missed_3.txt', res.missed_beatmaps);
save ('names_3.txt', res.names);

const res2 = founded_missing('missed_3.txt', path.join(userdata_2, 'osu!.db'));
save ('missed_4.txt', res2.missed_beatmaps);
save ('names_4.txt', res2.names);

const res3 = founded_missing('missed_4.txt', path.join('D:\\osu!', 'osu!.db'));
save ('missed_5.txt', res3.missed_beatmaps);
save ('names_5.txt', res3.names);*/



/*
fs.writeFileSync('founded.beatmaps_3.txt', 
	Array.from(new Set(res.founded_beatmaps)).join('\n'), { encoding: 'utf8'} );


fs.writeFileSync('missed.beatmaps_3.txt', 
	Array.from(new Set(res.missed_beatmaps)).join('\n'), { encoding: 'utf8'} );
*/

/*
const userdata_1 = 'F:\\node_js_stuff\\node_projects\\osu-beatmaps-filter\\userdata\\nnaoi\\db2';
const userdata_2 = 'F:\\node_js_stuff\\node_projects\\osu-beatmaps-filter\\userdata\\nnaoi\\db3';

const res_1 = founded_missing(path.join(userdata_1, 'osu!.db'));
const res_2 = founded_missing(path.join(userdata_2, 'osu!.db'));

fs.writeFileSync('founded.beatmaps_3.txt', 
	Array.from(new Set([...res_1.founded_beatmaps,...res_2.founded_beatmaps])).join('\n'), { encoding: 'utf8'} );


fs.writeFileSync('missed.beatmaps_2.txt', 
	Array.from(new Set([...res_1.missed_beatmaps,...res_2.missed_beatmaps])).join('\n'), { encoding: 'utf8'} );*/