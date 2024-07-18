const path = require('path');
const { songs_get_all_beatmaps, osu_file_beatmap_property} = require('osu-tools');

const { move_to } = require('./tools.js');
const { osu_path, backup_folder } = require('../config.js');

const gamemodes = ['osu', 'taiko', 'fruits', 'mania'];
const args = process.argv.slice(2);

if (args.length == 0) {
	console.log( "No arguments provided" );
	process.exit(0);
}

const selected_gamemode = args.map( x => x.trim( )) || null;
const selected_gamemodes_idx = selected_gamemode.map( x => gamemodes.indexOf(x)) || [];


if (!selected_gamemode || selected_gamemode && selected_gamemode.length == 0 || !selected_gamemodes_idx || selected_gamemodes_idx.length == 0) {
    console.log( "Invalid gamemode: " + selected_gamemode );
    process.exit(0);
}

const beatmap_props = [
	osu_file_beatmap_property.general_beatmap_filename,
	osu_file_beatmap_property.general_gamemode,
];

const scan_opts = { 
	songs_folder: 'Songs', 
	is_hit_objects_only_count: true, 
	is_read_only: true, 
	is_check_osb: false, 
	is_display_complete_time: false 
}

//move to backup
const songs_beatmaps = [];

songs_get_all_beatmaps(osu_path, beatmap_props, scan_opts, (beatmaps, folder) => {
	beatmaps.forEach( x => {
		songs_beatmaps.push({ ...x.general, folder });
	});
});

const filtered_beatmaps = songs_beatmaps.filter( x => selected_gamemodes_idx.indexOf(x.gamemode) == -1 );

move_to(filtered_beatmaps, 	
	path.join(osu_path, 'Songs'), 
	path.join(osu_path, backup_folder));

//move from backup
const songs_backups = [];
songs_get_all_beatmaps(osu_path, beatmap_props, {...scan_opts, songs_folder: backup_folder}, (beatmaps, folder) => {
	beatmaps.forEach( x => {
		songs_backups.push({ ...x.general, folder });
	});
});

const filtered_backup_beatmaps = songs_backups.filter( x => selected_gamemodes_idx.indexOf(x.gamemode) > -1 );

move_to(filtered_backup_beatmaps, 	
	path.join(osu_path, backup_folder),
	path.join(osu_path, 'Songs'));
