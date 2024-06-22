const path = require('path');
const { osu_db_load, beatmap_property, osu_db_find_beatmaps, collection_db_save, collection_db_load, RankedStatus, Gamemode } = require("osu-tools");
const fs = require('fs');

const { move_to_2, delete_from } = require('./tools.js');

const { conf_delete_beatmaps, osu_path, backup_folder } = require('./config.js');


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

const osu_db_beatmaps = osu_db_load(path.join(osu_path, 'osu!.db'), beatmap_props);

const beatmaps_to_delete = [];

const check_exists_beatmap = (beatmap) => {
	const beatmap_path = path.join(osu_path, 'Songs', beatmap.folder_name, beatmap.osu_filename)
	return fs.existsSync(beatmap_path);
}

osu_db_find_beatmaps(osu_db_beatmaps, x => {

	if (check_exists_beatmap(x) == false){
		return;
	}

	const count_objects = x.number_hitcircles + x.number_hitcircles + x.number_spinners;

	if (conf_delete_beatmaps.min_number_objects && count_objects < conf_delete_beatmaps.min_number_objects) {
		beatmaps_to_delete.push(x);
	}

	if(conf_delete_beatmaps.min_drain_time && x.drain_time < conf_delete_beatmaps.min_drain_time) {
		beatmaps_to_delete.push(x);
	}

	if(conf_delete_beatmaps.min_total_time && x.total_time < conf_delete_beatmaps.min_total_time) {
		beatmaps_to_delete.push(x);
	}

	if (conf_delete_beatmaps.ranked_status && x.ranked_status_int == conf_delete_beatmaps.ranked_status) {
        beatmaps_to_delete.push(x);
    }

	if (conf_delete_beatmaps.gamemode && x.gamemode_int == conf_delete_beatmaps.gamemode) {
        beatmaps_to_delete.push(x);
    }

});

if (conf_delete_beatmaps.backup_instead_delete) {
	move_to_2(beatmaps_to_delete, 	
		path.join(osu_path, 'Songs'), 
		path.join(osu_path, backup_folder));
} else {
	delete_from(beatmaps_to_delete, path.join(osu_path, 'Songs'));
}

console.log(`processed ${beatmaps_to_delete.length} beatmaps`);