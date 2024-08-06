const { existsSync } = require("node:fs");

const path = require("node:path");
const { osu_db_import_sr } = require("osu-tools");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const input = req.body.input_path;
	const input_2 = req.body.input_2_path;
	const output = req.body.output_path;

	if (!existsSync(input)) {
		throw new Error(`bin file path not found: ${input}`);
	}

	if (!existsSync(input_2)) {
		throw new Error(`osu!.db path not found: ${input_2}`);
	}
	console.log(input, {
		filename: path.basename(input_2),
		folder_path: path.dirname(input_2) 
	}, {
		filename: path.basename(output),
		folder_path: path.dirname(output) 
	})
	osu_db_import_sr(
		input, 
		{
			filename: path.basename(input_2),
			folder_path: path.dirname(input_2) 
		}, {
			filename: path.basename(output),
			folder_path: path.dirname(output) 
	});

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}