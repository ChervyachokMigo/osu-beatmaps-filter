
const path = require ('path');
const {scores_db_load, all_score_properties, scores_db_concat, scores_db_save, compare_files} = require('osu-tools');


module.exports = (input_path, input_2_path, output_path) => {

	const result1 = scores_db_load(input_path, all_score_properties);
	const result2 = scores_db_load(input_2_path, all_score_properties);

	const res = scores_db_concat(result1, result2);

	scores_db_save(res, output_path);
}