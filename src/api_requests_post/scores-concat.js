const { existsSync } = require("node:fs");
const path = require("node:path");
const { all_score_properties, scores_db_load, scores_db_concat, scores_db_save } = require("osu-tools");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const input_1 = req.body.input_path;
	const input_2 = req.body.input_2_path;
	const output = req.body.output_path;

	if (!existsSync(input_1)) {
		throw new Error(`Scores 1 path not found: ${input_1}`);
	}

	if (!existsSync(input_2)) {
		throw new Error(`Scores 2 path not found: ${input_2}`);
	}

	const result1 = scores_db_load(input_1, all_score_properties);
	const result2 = scores_db_load(input_2, all_score_properties);

	const result = scores_db_concat(result1, result2);

	scores_db_save(result, output);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}