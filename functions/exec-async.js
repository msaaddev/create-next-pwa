const { exec } = require('child_process');
const changeDir = require('in-folder');

module.exports = async (name, cmd) => {
	changeDir(name, () => process.cwd());

	const execPromise = new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			resolve();
		});
	});

	return execPromise;
};
