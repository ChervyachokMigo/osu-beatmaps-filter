const { existsSync } = require("node:fs");
const action = require("../api_tools/mania_slider_collections");

module.exports = async (req, res) => {
	const osu_path = req.body.input_path;
	const output = req.body.output_path;

	if (!existsSync(osu_path)) {
		throw new Error(`Osu path not found: ${osu_path}`);
	}

	action(osu_path, output);

	await res.send(JSON.stringify({response: 'mania slider collections complete'}));
}