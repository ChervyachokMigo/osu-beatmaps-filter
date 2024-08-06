const { existsSync } = require("node:fs");
const path = require("node:path");
const { osu_db_concat_sr, osu_db_save } = require("osu-tools");

const request_filename = path.basename(__filename, path.extname(__filename));

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

	const result = osu_db_concat_sr({
		filename: path.basename(input_1),
		folder_path: path.dirname(input_1) 
	}, {
		filename: path.basename(input_2),
		folder_path: path.dirname(input_2) 
	});

	console.log('[ saving ]');
	osu_db_save(result, output);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}