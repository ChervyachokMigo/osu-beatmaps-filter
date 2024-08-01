const path = require('node:path');
const { existsSync } = require('node:fs');

const { osu_db_load, beatmap_property, osu_db_find_beatmaps, osu_file_beatmap_property, songs_get_all_beatmaps } = require("osu-tools");

const { move_to_2, delete_from, move_to } = require('../tools/tools.js');

module.exports = (osu_path, backup_path) => {
	
	const songs_path = path.join(osu_path, 'Songs');
	
	const backup_dirname = path.dirname(backup_path);
	const backup_folder = path.basename(backup_path);

	if (!existsSync(songs_path)) {
		throw new Error(`songs path not found: ${songs_path}`);
	}

	if (!existsSync(backup_path)) {
		throw new Error(`backup path not found: ${backup_path}`);
	}

	
	const beatmap_props = [
		osu_file_beatmap_property.general_beatmap_filename,
		osu_file_beatmap_property.general_gamemode,
	];

	const scan_opts = { 
		songs_folder: backup_folder,
		is_hit_objects_only_count: true, 
		is_read_only: true, 
		is_check_osb: true, 
		is_display_complete_time: false 
	}


	const restore_beatmaps = [];


	console.log('backup_dirname', backup_dirname);
	console.log('backup_folder', backup_folder);

	songs_get_all_beatmaps( backup_dirname, beatmap_props, scan_opts, (beatmaps, folder) => {
		beatmaps.forEach( x => {
			restore_beatmaps.push({ ...x.general, folder });
		});
	});

	move_to(restore_beatmaps, backup_path, songs_path);

	console.log(`processed ${restore_beatmaps.length} beatmaps`);
}
