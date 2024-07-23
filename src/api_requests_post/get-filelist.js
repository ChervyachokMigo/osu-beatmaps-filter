const { execSync } = require('child_process');
const { readdirSync } = require('fs');
const path = require('path');

const default_path = path.join(require('os').homedir(), 'desktop');

const get_drives = () => execSync('wmic logicaldisk get name', {encoding: 'utf8'}).split('\r\r\n')
	.filter(value => /[A-Za-z]:/.test(value))
	.map(value => value.trim());

const drives = get_drives();

const get_filelist = (dir_path, accept_exts = null, offset = 0, limit = 1000 ) => {

	if (dir_path.length == 0) {
		return drives.map( x => ({directory: true, name: x, ext: '' }));

	} else {
		const ends_with_slash = dir_path.endsWith('\\');
		const dir_path_with_end_slash = !ends_with_slash ? dir_path + '\\' : dir_path;
		return [{directory: true, name: '..', ext: ''}, 
			...readdirSync( dir_path_with_end_slash, {encoding: 'utf8', withFileTypes: true})
			.map( x => ({directory: x.isDirectory(), name: x.name, ext: path.extname(x.name) }))]
			.filter ( x => accept_exts? x.directory || (x.ext && accept_exts.includes(x.ext)) : true )
			.filter( (x, i) => i >= offset && i < offset + limit );
	}
}

module.exports = (req, res) => {
	const response = {};

	if (req.body.path == 'default_path') {
		response.path = default_path;
		
	} else {
		const path_escaped = req.body.path.split('\\').filter( (v, i, a) => a[i+1] != '..' && v != '..').join('\\');
		response.path = path_escaped;
	}

	response.filelist = get_filelist(response.path, req.body.accept_exts);

	res.send(JSON.stringify(response));
}