const osu_tools = require('osu-tools');
const fs = require('fs');
const path = require('path');



const { osu_folder, backup_folder } = require('./config.js');

const args = process.argv.slice(2);

if (args.length == 0) {
	console.log( "No arguments provided" );
	process.exit(0);
}

const gamemodes = ['osu', 'taiko', 'fruits', 'mania'];

const selected_gamemode = args.shift() || null;
const selected_gamemode_idx = gamemodes.indexOf(selected_gamemode);

if (selected_gamemode && selected_gamemode_idx == -1) {
    console.log( "Invalid gamemode: " + selected_gamemode );
    process.exit(0);
}

const props = [
	osu_tools.osu_file_beatmap_property.general_beatmap_filename,
	osu_tools.osu_file_beatmap_property.general_gamemode,
]

const all_beatmaps = [];

console.log(selected_gamemode_idx)
osu_tools.songs_get_all_beatmaps(osu_folder, props, { is_hit_objects_only_count: true, is_read_only: true }, (folder_beatmaps, folder) => {
	folder_beatmaps.forEach( x => {
		all_beatmaps.push({ ...x.general, folder });
	});
});

const filtered_beatmaps = all_beatmaps.filter( x => x.gamemode !== selected_gamemode_idx && path.extname(x.beatmap_filename)==='.osu' );

const check_folder = (folderpath) => {
	if( !fs.existsSync(folderpath) ){
		fs.mkdirSync(folderpath, {recursive: true });
	}
}

filtered_beatmaps.map( x => {
	const backup_beatmap_folder = path.join(backup_folder, x.folder);
    check_folder(backup_beatmap_folder);
	const source = path.join(osu_folder, 'Songs', x.folder, x.beatmap_filename);
	const dest = path.join(backup_beatmap_folder, x.beatmap_filename);
	try {
		fs.renameSync(source, dest);
	} catch (e) {
		console.error(e)
	}
});
