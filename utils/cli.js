const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const pwa = require('./pwa');
const handleError = require('node-cli-handle-error');

module.exports = async (name, flag, currentDir) => {
	const spinner = ora();

	if (flag.length === 0) {
		console.log('');
	}
	spinner.start(`${chalk.bold.dim('Creating Next.js App...')}`);

	try {
		// creating a Next.js app
		await execa(`npx`, [`create-next-app`, `${name}`]);

		// succeed
		spinner.succeed(`${chalk.green('Next.js App created.')}`);

		await pwa(name, currentDir);
	} catch (err) {
		spinner.fail(`Couldn't create an app.`);
		handleError(`Something went wrong.`, err);
	}
};
