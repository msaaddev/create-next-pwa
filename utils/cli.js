const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const pwa = require('./pwa');
const tailwindIntegration = require('./tailwind-integration');
const handleError = require('node-cli-handle-error');

module.exports = async (name, flags, currentDir) => {
	const spinner = ora();

	if (flags.length === 0) {
		console.log('');
	}
	spinner.start(`${chalk.bold.dim('Creating Next.js App...')}`);

	try {
		// creating a Next.js app
		await execa(`npx`, [`create-next-app`, `${name}`]);

		// succeed
		spinner.succeed(`${chalk.green('Next.js App created.')}`);

		await pwa(name, currentDir);

		if (flags.indexOf('--tailwind') !== -1 || flags.indexOf('-t') !== -1) {
			await tailwindIntegration(name, currentDir);
		}
	} catch (err) {
		spinner.fail(`Couldn't create an app.`);
		handleError(`Something went wrong.`, err);
	}
};
