const { existsSync } = require("node:fs");
const action = require("../api_tools/starrate_fix");
const path = require("node:path");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const input = req.body.input_path;
	const output = req.body.output_path;

	if (!existsSync(input)) {
		throw new Error(`Input file not found: ${input}`);
	}

	action(input, output);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}