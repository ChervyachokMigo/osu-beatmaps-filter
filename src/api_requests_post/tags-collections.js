const { existsSync } = require("fs");
const action = require("../api_tools/tags_collections");

module.exports = async (req, res) => {
	const osu_db = req.body.input_path;
	const collection = req.body.input_2_path;
	const output = req.body.output_path;

	if (!existsSync(osu_db)) {
		throw new Error(`Input file not found: ${osu_db}`);
	}

		if (!existsSync(collection)) {
		throw new Error(`Input file not found: ${collection}`);
	}

	action(osu_db, collection, output);

	await res.send(JSON.stringify({response: 'create tags collections complete'}));
}