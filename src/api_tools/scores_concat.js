
const path = require ('path');
const {scores_db_load, all_score_properties, scores_db_concat, scores_db_save} = require('osu-tools');


module.exports = (input_path, input_2_path, output_path) => {

	const result1 = scores_db_load(input_path, all_score_properties);
	const result2 = scores_db_load(input_2_path, all_score_properties);

	/*scores_db_save(result1, 'data\\1\\scores_2.db');
	console.log('scores.db 1', compare_files('data\\1\\scores.db', 'data\\1\\scores_2.db'));*/

	const res = scores_db_concat(result1, result2);

	scores_db_save(res, output_path);
}