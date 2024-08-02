const { existsSync } = require("node:fs");
const action = require("../api_tools/osu_db_fix_starrate");

module.exports = async (req, res) => {
	const input = req.body.input_path;
	const output = req.body.output_path;

	if (!existsSync(input)) {
		throw new Error(`Input file not found: ${input}`);
	}

	action(input, output);

	await res.send( JSON.stringify({ response: `${__filename} complete` }));
}