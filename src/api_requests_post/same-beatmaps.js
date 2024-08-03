const { existsSync } = require("node:fs");
const path = require("path");

const action = require("../api_tools/same_beatmaps");

const request_filename = path.basename(__filename, path.extname(__filename));

module.exports = async (req, res) => {
	const action_name =  req.body.action;
	const osu_path = req.body.input_path;

	if (!existsSync(osu_path)) {
		throw new Error(`Osu path not found: ${osu_path}`);
	}

    if (action_name === 'scan') {
		const response = action.scan(osu_path);

		await res.send( JSON.stringify({ 
			action: `${request_filename}-${action_name}`,
			response: response 
		}));

	} else if (action_name === 'concat') {
		if (typeof req.body.selected_id === 'number' && req.body.folder && req.body.folder.folders) {
			action.concat( osu_path, req.body.selected_id, req.body.folder.folders );
		}
		await res.send( JSON.stringify({ response: `${request_filename}-${action_name} complete` }));

	} else {
		await res.send( JSON.stringify({ response: `${request_filename}-${action_name} complete` }));
	}
	

}