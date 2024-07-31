const { existsSync } = require("node:fs");
const action = require("../api_tools/delete_beatmaps");
const { check_folder } = require("../tools/tools");

module.exports = async (req, res) => {
	const osu_path = req.body.input_path;
	const backup_path = req.body.input_2_path;
	const args = req.body.args;

	if (!existsSync(osu_path)) {
		throw new Error(`Osu path not found: ${osu_path}`);
	}

	check_folder(backup_path);

	action(osu_path, backup_path, args);

	await res.send(JSON.stringify({response: 'delete beatmaps complete'}));
}