
const {execSync} = require('node:child_process');

const command = 'chcp 65001 && tasklist /NH /FI "IMAGENAME eq osu!.exe" /FO CSV';

const is_osu_running = () => {
	const data = execSync(command).toString();
	if (data.includes('No tasks')) {
		return false;
	} else {
		return true;
	}
}

module.exports = {
	load: () => {
		setInterval( () => {
			const element = document.getElementById('test');
			element.innerText = is_osu_running() ? 'osu запущена' : 'osu можно запустить';

		}, 500);
	}
}