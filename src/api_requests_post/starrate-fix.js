const { existsSync } = require("fs");
const osu_db_fix_starrate = require("../tools/osu_db_fix_starrate");

module.exports = async (req, res) => {
	const input = req.body.input_path;
	const output = req.body.output_path;

	if (!existsSync(input)) {
		throw new Error(`Input file not found: ${input}`);
	}

	osu_db_fix_starrate(input, output);

	await res.send(JSON.stringify({response: 'fix starrate complete'}));
}