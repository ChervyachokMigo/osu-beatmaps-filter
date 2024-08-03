const path = require('path');
const fs = require('fs');

const { collection_db_load, beatmap_property, osu_db_load } = require('osu-tools');

const request_beatmap_by_md5 = require('../tools/request_beatmap_by_md5');

module.exports = async (input_osu_path, output_path, args) => {

	const beatmap_props = [
		beatmap_property.beatmap_md5,
		beatmap_property.beatmapset_id
	];

	const userdata_osu_db = osu_db_load( path.join(input_osu_path, 'osu!.db'), beatmap_props );

	const exists = new Set( userdata_osu_db.beatmaps.map( x => x.beatmap_md5 ));

	const collections = collection_db_load( path.join(input_osu_path, 'collection.db') );

	console.log('finding missed beatmaps from collections');

	const collections_missed = [];

	collections.collections.forEach( x => {
		const beatmaps_missed = [];

		x.beatmaps_md5.forEach( beatmap => {
			if ( !exists.has( beatmap )){
				beatmaps_missed.push( beatmap );
			};
		})

		collections_missed.push({ name: x.name, beatmaps_md5: beatmaps_missed })
	});

	console.log('requesting beatmaps from bancho');

	const checked_beatmaps = new Set();

	const founded_beatmaps = new Set();
	const missed_beatmaps = new Set();

	for (const {name, beatmaps_md5} of collections_missed) {
		console.log( `processing collection: ${name}`, 
			`(${collections_missed.findIndex( x => name === x.name)}/${collections_missed.length})`);

		for (const md5 of beatmaps_md5) {
			if (checked_beatmaps.has(md5)){
				continue;
			}
			console.log(`processing beatmap: ${md5}`, `(${beatmaps_md5.indexOf(md5)}/${beatmaps_md5.length})`);
			const info = await request_beatmap_by_md5( args.api_key, md5 );
			if (info) {
				founded_beatmaps.add( info.beatmapset_id );
			} else {
				missed_beatmaps.add( md5 );
			}
			checked_beatmaps.add(md5);
		}
	}


	fs.writeFileSync(path.join(output_path, 'founded_beatmaps.txt'), Array.from(founded_beatmaps).join('\n'), { encoding: 'utf8'} );
	console.log(path.join(output_path, 'founded_beatmaps.txt'), 'saved');
	
	fs.writeFileSync(path.join(output_path, 'missed_beatmaps.txt'), Array.from(missed_beatmaps).join('\n'), { encoding: 'utf8'} );
	console.log(path.join(output_path, 'missed_beatmaps.txt'), 'saved');

}