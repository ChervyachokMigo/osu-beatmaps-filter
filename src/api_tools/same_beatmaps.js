
const path = require ('path');
const fse = require('fs-extra');
const {osu_db_load, beatmap_property} = require('osu-tools');
const { exec } = require('child_process');

const get_number_from_begin = (str) => Number( str.match(/^\d+/g) );

const get_beatmapset_id = ( folder_name, beatmapset_id ) => {
	if (beatmapset_id > 0) {
		return beatmapset_id;
	}

	return get_number_from_begin( folder_name );;
}

module.exports = {
	scan: (osu_path) => {

		const osu_db = osu_db_load( path.join(osu_path, 'osu!.db'), [
			beatmap_property.folder_name,
			beatmap_property.osu_filename,
			beatmap_property.beatmapset_id,
			beatmap_property.beatmap_id,
			beatmap_property.artist,
			beatmap_property.title 
		]);

		const beatmapsets = [];

		for ( let x of osu_db.beatmaps ) {
			const beatmapset_id = get_beatmapset_id( x.folder_name, x.beatmapset_id );
			if (beatmapset_id > 0) {
				const idx = beatmapsets.findIndex( val=> val.id === beatmapset_id );
				if ( idx == -1) {
                    beatmapsets.push({ id: beatmapset_id, folders: [ x.folder_name ] });
				} else {
					const pushed_idx = beatmapsets[idx].folders.findIndex( v => v === x.folder_name );
					if (pushed_idx === -1) {
						beatmapsets[idx].folders.push( x.folder_name );
					}
				}
			} else {
				console.error(` ${x.folder_name} карта будет пропущена.`);
			}
		}

		const beatmapsets_copies = beatmapsets.filter( val => val.folders.length > 1 );
		console.log('найдено одинаковых', beatmapsets_copies.length, 'карт');

		return beatmapsets_copies;
	},

	concat: (osu_path, selected_id, folders) => {
		console.log('вы выбрали папку', folders[selected_id]);
		for (let folder of folders){
			if (folder !== folders[selected_id]){
				try {
					const src = path.join( osu_path, 'Songs', folder );
					const dest = path.join( osu_path, 'Songs', folders[selected_id] );
					fse.copySync( src, dest );
					fse.removeSync( src );
					console.log(`файлы перемещены из ${folder} в ${folders[selected_id]}`);
				} catch (err) {
					console.error(err);
				}
			}
		}
	},

	open: (osu_path, selected_id, folders) => {
		console.log('вы выбрали папку', folders[selected_id]);
		const folder_path = path.join( osu_path, 'Songs', folders[selected_id] );
		exec(`explorer.exe "${folder_path}"`);
	}
}