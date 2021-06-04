const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const pwa = require('./pwa');

module.exports = async (name, flag) => {
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

		await pwa(name);
	} catch (err) {
		console.log(err);
		spinner.fail(`Couldn't create an app.`);
	}
};
