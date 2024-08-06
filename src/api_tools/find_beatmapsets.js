
/*const path = require ('path');
const fse = require('fs-extra');
const {songs_get_all_beatmaps, osu_file_beatmap_property} = require('osu-tools');

const get_number_from_begin = (str) => Number( str.match(/^\d+/g) );

const osu_path = 'D:\\osu!';

songs_get_all_beatmaps(osu_path, [
	osu_file_beatmap_property.metadata_beatmapset_id, 
	osu_file_beatmap_property.metadata_beatmap_id,
	osu_file_beatmap_property.general_beatmap_filename,
	osu_file_beatmap_property.metadata_title,
	osu_file_beatmap_property.metadata_artist 
], {is_read_only: true, is_check_osb: false}, (beatmaps, folder) => {

	const folder_id = get_number_from_begin(folder);
	if (folder_id === 0) {
        return;
    }
	for (const beatmap of beatmaps){
		if (typeof beatmap.metadata === 'undefined') {

			console.error('beatmap', beatmap);
			console.log(folder);
			continue;
		}

		const beatmapset_id = beatmap.metadata.beatmapset_id;
		if (folder_id !== beatmapset_id) {
			if (typeof beatmapset_id === 'undefined' || beatmapset_id === -1) {
				continue;
			}

			console.log(beatmap);
			console.log(folder);
			console.log(folder_id === beatmapset_id, folder_id, beatmapset_id);
		}
	}
});*/