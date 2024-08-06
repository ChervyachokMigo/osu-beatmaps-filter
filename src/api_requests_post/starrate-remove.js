const { existsSync } = require("node:fs");

const path = require("node:path");
const { osu_db_export_sr, all_beatmap_properties, osu_db_load, osu_db_save } = require("osu-tools");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const input = req.body.input_path;
	const output = req.body.output_path;

	if (!existsSync(input)) {
		throw new Error(`osu!.db path not found: ${input}`);
	}

	const osu_db_beatmaps = osu_db_load(input, all_beatmap_properties);

	osu_db_beatmaps.beatmaps.forEach( (x, i, arr) => {

		arr[i].star_rating_std = [];
		arr[i].star_rating_mania = [];
		arr[i].star_rating_ctb = [];
		arr[i].star_rating_taiko = [];

	})

	osu_db_save(osu_db_beatmaps, output);

	await res.send( JSON.stringify({ response: `${request_filename} complete` }));
}