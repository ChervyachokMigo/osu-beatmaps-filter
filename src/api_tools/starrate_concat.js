
const { osu_db_save, osu_db_concat_sr } = require("osu-tools");
const path = require("path");

module.exports = (input_path, input_2_path, output_path) => {

	const result = osu_db_concat_sr({
		filename: path.basename(input_path),
		folder_path: path.dirname(input_path) 
	}, {
		filename: path.basename(input_2_path),
		folder_path: path.dirname(input_2_path) 
	});

	console.log('[ saving ]');
	osu_db_save(result, output_path);
}
