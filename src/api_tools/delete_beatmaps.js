const path = require('node:path');
const { existsSync } = require('node:fs');

const { osu_db_load, beatmap_property, osu_db_find_beatmaps } = require("osu-tools");

const { move_to_2, delete_from } = require('../tools/tools.js');

module.exports = (osu_path, backup_path, args) => {
	
	const osu_db_path = path.join(osu_path, 'osu!.db');
	const songs_path = path.join(osu_path, 'Songs');

	if (!existsSync(osu_db_path)) {
		throw new Error(`osu db path not found: ${osu_db_path}`);
	}
	console.log(typeof args, 'args', args);
	return;
	const beatmap_props = [
		beatmap_property.osu_filename,
		beatmap_property.folder_name,

		beatmap_property.beatmap_md5,

		beatmap_property.gamemode,
		beatmap_property.ranked_status,

		beatmap_property.number_sliders,
		beatmap_property.number_hitcircles,
		beatmap_property.number_spinners,

		beatmap_property.total_time,
		beatmap_property.drain_time,
	];

	const osu_db_beatmaps = osu_db_load(osu_db_path, beatmap_props);

	const beatmaps_to_delete = [];

	const check_exists_beatmap = (beatmap) => {
		const beatmap_path = path.join(songs_path, beatmap.folder_name, beatmap.osu_filename);
		return existsSync(beatmap_path);
	}

	osu_db_find_beatmaps(osu_db_beatmaps, x => {

		if (check_exists_beatmap(x) === false){
			return;
		}

		const count_objects = x.number_hitcircles + x.number_hitcircles + x.number_spinners;

		if (args.min_number_objects && count_objects < args.min_number_objects) {
			beatmaps_to_delete.push(x);
		}

		if(args.min_drain_time && x.drain_time < args.min_drain_time) {
			beatmaps_to_delete.push(x);
		}

		if(args.min_total_time && x.total_time < args.min_total_time) {
			beatmaps_to_delete.push(x);
		}

		if (args.ranked_status && args.gamemode) {
			if (x.ranked_status_int === args.ranked_status) {
				if (x.gamemode_int === args.gamemode) {
					beatmaps_to_delete.push(x);
				}
			}
		} else {
			if (args.ranked_status && x.ranked_status_int === args.ranked_status) {
				beatmaps_to_delete.push(x);
			}

			if (args.gamemode && x.gamemode_int === args.gamemode) {
				beatmaps_to_delete.push(x);
			}
		}

	});

	if (args.backup_instead_delete) {
		move_to_2(beatmaps_to_delete, songs_path, backup_path);
	} else {
		delete_from(beatmaps_to_delete, songs_path);
	}

	console.log(`processed ${beatmaps_to_delete.length} beatmaps`);
}
