const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');

module.exports = async name => {
	const spinner = ora();
	spinner.start(`${chalk.bold.dim('Creating Next.js App...')}`);

	try {
		// creating a Next.js app
		await execa(`npx`, [`create-next-app`, `${name}`]);

		// succeed
		spinner.succeed(`${chalk.green('Next.js App Created.')}`);
	} catch (err) {
		spinner.fail(`Couldn't create an app.`);
	}
};
