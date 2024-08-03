const { existsSync } = require("node:fs");
const action = require("../api_tools/starrate_calculation_progress");
const path = require("node:path");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const input_1 = req.body.input_path;

	if (!existsSync(input_1)) {
		throw new Error(`osu!.db path not found: ${input_1}`);
	}

	action(input_1);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}