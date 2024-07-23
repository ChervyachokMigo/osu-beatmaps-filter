const {execSync} = require('child_process');
const { readdirSync } = require('fs-extra');
const path = require('path');
console.log(
	('F:').endsWith('\\'),
	readdirSync('F:')
);
