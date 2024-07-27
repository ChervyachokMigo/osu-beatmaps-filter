const { collection_db_load, get_collections_detailed, beatmap_property, osu_db_load } = require('osu-tools');
const path = require('path');
const fs = require('fs');

const request_beatmap_by_md5 = require('./request_beatmap_by_md5');


const beatmap_props = [
	beatmap_property.beatmap_md5,
	beatmap_property.gamemode,
	beatmap_property.title,
	beatmap_property.artist,
    beatmap_property.creator,
    beatmap_property.difficulty,
    beatmap_property.beatmap_id,
	beatmap_property.beatmapset_id
];

const userdata = 'F:\\node_js_stuff\\node_projects\\osu-beatmaps-filter\\userdata\\nnaoi';

const osu_db_beatmaps = osu_db_load(path.join('D:\\osu!', 'osu!.db'), beatmap_props);
const userdata_osu_db = osu_db_load(path.join(userdata, 'osu!.db'), beatmap_props);

const exists = new Set(userdata_osu_db.beatmaps.map( x => x.beatmap_md5));

const collections = collection_db_load( path.join(userdata, 'collection.db'));

const missing = [];

collections.collections.forEach( x => {
	const beatmaps_missing = [];
	x.beatmaps_md5.forEach( beatmap => {
		if (!exists.has(beatmap)){
			beatmaps_missing.push(beatmap);
		};
	})
	missing.push({ name: x.name, beatmaps_md5: beatmaps_missing})
});

collections.collections = missing;

const founded_beatmaps = [];
const missed_beatmaps = [];

const check_beatmaps = async () => {

	for (const collection of missing) {
		for (const md5 of collection.beatmaps_md5) {
			const info = await request_beatmap_by_md5({ md5 });
			if (info) {
				founded_beatmaps.push(info.beatmapset_id);
			} else {
				missed_beatmaps.push(md5);
			}	
		}
	}

	fs.writeFileSync('founded.beatmaps.txt', Array.from(new Set(founded_beatmaps)).join('\n'), { encoding: 'utf8'} );
	fs.writeFileSync('missed.beatmaps.txt', Array.from(new Set(missed_beatmaps)).join('\n'), { encoding: 'utf8'} );

}

check_beatmaps();


