const { existsSync } = require("node:fs");
const action = require("../api_tools/starrate_concat");

module.exports = async (req, res) => {
	const input_1 = req.body.input_path;
	const input_2 = req.body.input_2_path;
	const output = req.body.output_path;

	if (!existsSync(input_1)) {
		throw new Error(`osu!.db 1 path not found: ${input_1}`);
	}

	if (!existsSync(input_2)) {
		throw new Error(`osu!.db 2 path not found: ${input_2}`);
	}

	action(input_1, input_2, output);

	await res.send( JSON.stringify({ response: `${__filename} complete` }));
}