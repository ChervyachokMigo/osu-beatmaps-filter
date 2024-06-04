const { songs_get_all_beatmaps, osu_file_beatmap_property} = require('osu-tools');
const fs = require('fs');
const path = require('path');



const { osu_path } = require('./config.js');
const { check_folder } = require('./tools.js');

const gamemodes = ['osu', 'taiko', 'fruits', 'mania'];
const args = process.argv.slice(2);

const selected_gamemode = 'osu';
const selected_gamemode_idx = gamemodes.indexOf(selected_gamemode);

const beatmap_props = [
	osu_file_beatmap_property.metadata_beatmap_md5,
	osu_file_beatmap_property.metadata_beatmap_id,
	osu_file_beatmap_property.metadata_beatmapset_id,
	osu_file_beatmap_property.general_gamemode,
	osu_file_beatmap_property.hit_objects_block,
	osu_file_beatmap_property.hit_objects,
];

const scan_opts = { 
	songs_folder: 'Songs_backup_', 
	is_hit_objects_only_count: false, 
	is_read_only: true, 
	is_check_osb: false, 
	is_display_complete_time: false 
}

const beatmaps_folder = 'beatmaps_hit_objects'

const scan_beatmaps = () => {
	check_folder(beatmaps_folder);

	songs_get_all_beatmaps(osu_path, beatmap_props, scan_opts, (beatmaps, folder) => {
		beatmaps.forEach( x => {
			if (x?.hit_objects?.hit_objects){
				const beatmap = { ...x.general, ...x.metadata, hit_objects: x?.hit_objects?.hit_objects };
				if (beatmap.gamemode === selected_gamemode_idx ) {
					fs.writeFileSync(path.join(beatmaps_folder, beatmap.beatmap_md5), JSON.stringify(beatmap));
				}
			}
		});
	});
}

const beatmaps_z_pattern = 'z-pattern';

const distance = (p1, p2) => {
	return Math.sqrt(Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p1.y - p2.y), 2));
}

const find_z_pattern = () => {
	check_folder(beatmaps_z_pattern);

	const founded_beatmaps = [];
	const beatmaps = fs.readdirSync(beatmaps_folder);

	for (let b in beatmaps) {
		//console.log('checking beatmap:', beatmaps[b], b, 'of', beatmaps.length);
		const beatmap = JSON.parse(fs.readFileSync(path.join(beatmaps_folder, beatmaps[b])));
		for (let i = 0; i < beatmap.hit_objects.length - 3; i++) {
			const p1 = { 	
				x: beatmap.hit_objects[i].x, 
				y: beatmap.hit_objects[i].y }
			const p2 = {	
				x: beatmap.hit_objects[i+1].x, 
				y: beatmap.hit_objects[i+1].y }
			const p3 = {	
				x: beatmap.hit_objects[i+2].x, 
				y: beatmap.hit_objects[i+2].y }
			const p4 = {	
				x: beatmap.hit_objects[i+3].x, 
				y: beatmap.hit_objects[i+3].y }
			
			if ( p1.x < p2.x && p1.x < p4.x && p1.y > p3.y && p1.y > p4.y &&
				 p2.x > p1.x && p2.x > p3.x && p2.y > p3.y && p2.y > p4.y &&
				 p3.x < p2.x && p3.x < p4.x && p3.y < p1.y && p3.y < p2.y &&
				 p4.x > p1.x && p4.x > p3.x && p4.y < p1.y && p4.y < p2.y &&
				 Math.abs(distance(p1, p2) - distance(p3,p4)) == 0
			) {
				console.log('founded beatmap: ', beatmap.beatmap_md5);
				founded_beatmaps.push(beatmap);
				fs.writeFileSync(path.join(beatmaps_z_pattern, beatmap.beatmap_md5), JSON.stringify(beatmap));
			}
		}
	}
}

if (args.indexOf('scan') > -1){
	scan_beatmaps();
}

if (args.indexOf('find') > -1){
	find_z_pattern();
}


