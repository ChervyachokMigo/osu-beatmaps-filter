const fs = require('fs')
const path = require('path')

const _this =module.exports = {
	check_folder: (folderpath) => {
		if( !fs.existsSync(folderpath) ){
			fs.mkdirSync(folderpath, {recursive: true });
		}
	},

	move_to: (beatmaps, source_path, dest_path) => {
		for (x of beatmaps) {
			const source_filepath = path.join(source_path, x.folder, x.beatmap_filename);
			const dest_filepath = path.join(dest_path, x.folder, x.beatmap_filename);
			try {
				_this.check_folder(path.join(source_path, x.folder));
				_this.check_folder(path.join(dest_path, x.folder));
				fs.renameSync(source_filepath, dest_filepath);
			} catch (e) {
				console.error(e)
			}
		}
	},
}