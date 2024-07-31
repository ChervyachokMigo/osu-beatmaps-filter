const fs = require('node:fs')
const path = require('node:path')

const _this =module.exports = {
	check_folder: (folderpath) => {
		if( !fs.existsSync(folderpath) ){
			fs.mkdirSync(folderpath, {recursive: true });
		}
	},

	move_to: (beatmaps, source_path, dest_path) => {
		if (!beatmaps || !Array.isArray(beatmaps)){
			console.error('Input should be an array');
            return;
		}

		for (let x of beatmaps) {
			const source_filepath = path.join(source_path, x.folder, x.beatmap_filename);
			const dest_filepath = path.join(dest_path, x.folder, x.beatmap_filename);
			try {
				_this.check_folder(path.join(source_path, x.folder));
				_this.check_folder(path.join(dest_path, x.folder));
				fs.renameSync(source_filepath, dest_filepath);
			} catch (e) {
				console.error(e);
			}
		}
	},

	move_to_2: (beatmaps, source_path, dest_path) => {
		if (!beatmaps || !Array.isArray(beatmaps)){
			console.error('Input should be an array');
            return;
		}

		for (let x of beatmaps) {
			const source_filepath = path.join(source_path, x.folder_name, x.osu_filename);
			const dest_filepath = path.join(dest_path, x.folder_name, x.osu_filename);
			try {
				_this.check_folder(path.join(source_path, x.folder_name));
				_this.check_folder(path.join(dest_path, x.folder_name));
				if(fs.existsSync(source_filepath)) {
					fs.renameSync(source_filepath, dest_filepath);
					console.log(`backup: ${source_filepath} to ${dest_filepath}`);
				} else {
					console.log(`backup: ${source_filepath} not found`);
				}
			} catch (e) {
				console.error(e);
			}
		}
	},

	delete_from: (beatmaps, source_path) => {
		if (!beatmaps || !Array.isArray(beatmaps)){
			console.error('Input should be an array');
            return;
		}

		for (let x of beatmaps) {
			const source_filepath = path.join(source_path, x.folder_name, x.osu_filename);
			try {
				if(fs.existsSync(source_filepath)) {
					fs.unlinkSync(source_filepath);
					console.log(`delete: ${source_filepath}`);
				} else {
					console.log(`delete: ${source_filepath} not found`);
				}
			} catch (e) {
				console.error(e);
			}
		}
	},
}