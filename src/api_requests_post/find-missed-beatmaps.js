const { existsSync } = require("node:fs");
const action = require("../api_tools/find_missed_beatmaps");
const { check_folder } = require("../tools/tools");
const path = require("node:path");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const osu_path = req.body.input_path;
	const output = req.body.output_path;
	const args = req.body.args;

	if (!existsSync(osu_path)) {
		throw new Error(`Osu path not found: ${osu_path}`);
	}

	check_folder(output);

	action(osu_path, output, args);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}