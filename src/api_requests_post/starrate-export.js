const { existsSync } = require("node:fs");

const path = require("node:path");
const { osu_db_export_sr } = require("osu-tools");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const input = req.body.input_path;
	const output = req.body.output_path;

	if (!existsSync(input)) {
		throw new Error(`osu!.db path not found: ${input}`);
	}
	
	osu_db_export_sr({
		filename: path.basename(input),
		folder_path: path.dirname(input) 
	}, output);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}