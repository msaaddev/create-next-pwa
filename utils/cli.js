const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const pwa = require('./pwa');
const tailwind = require('./tailwind');
const handleError = require('node-cli-handle-error');
const fs = require('fs');
const logSymbols = require('log-symbols');

module.exports = async (name, flags, currentDir, isTailwind = false) => {
	const spinner = ora();

	if (flags.length === 0) {
		console.log('');
	}
	spinner.start(`${chalk.bold.dim('Creating Next.js App...')}`);

	try {
		// creating a Next.js app
			// verify if typescript option is selected
			if (flags.indexOf('--ts') !== -1 || flags.indexOf('--typescript') !== -1) {
				await execa(`npx`, [`create-next-app@latest`, `${name}`, `--typescript`]);
			} else {
				await execa(`npx`, [`create-next-app@latest`, `${name}`]);
			}

		// succeed
		spinner.succeed(`${chalk.white('Next.js App created.')}`);

		await pwa(name, currentDir, isTailwind);

		isTailwind && (await tailwind(name, currentDir));
		return true;
	} catch (err) {
		spinner.fail(`Couldn't create an app.`);

		// check if directory exists
		const filenames = fs.readdirSync(process.cwd());
		const isDirExist = filenames.indexOf(`${name}`) !== -1 ? true : false;

		if (isDirExist) {
			console.log(
				`\n${logSymbols.error} ${chalk.bgRed
					.hex(`#000000`)
					.bold(
						` ${name} `
					)} directory already exists. Try changing the name.\n`
			);
		} else {
			handleError(`Something went wrong.`, err);
		}
		return false;
	}
};
