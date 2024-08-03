const { existsSync } = require("node:fs");
const action = require("../api_tools/mania_slider_collections");
const path = require("node:path");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const osu_path = req.body.input_path;
	const output = req.body.output_path;

	if (!existsSync(osu_path)) {
		throw new Error(`Osu path not found: ${osu_path}`);
	}

	action(osu_path, output);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}