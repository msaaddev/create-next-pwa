const cliTable = require('cli-table');
const colors = require('colors');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

module.exports = (name, isTailwind = false) => {
	console.log('');

	if (!isTailwind) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.bold(` Next.js PWA `).black,
			'created successfully.'
		);
	} else {
		console.log(
			logSymbols.info,
			chalk.bgGreen.bold(` Next.js PWA `).black,
			`with ${chalk.bgGreen.bold(` Tailwind `).black}`,
			'created successfully'
		);
	}

	console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
	console.log(chalk.cyan(`cd`), `${name}`);
	console.log(chalk.cyan(`git`), `init`);
	console.log(chalk.cyan(`npm run dev`));

	// create a table
	const table = new cliTable();
	table.push([
		' Star '.bgYellow.black.bold,
		'https://github.com/msaaddev/create-next-pwa'.grey
	]);
	table.push([
		' Follow '.bgCyan.black.bold,
		'http://twitter.com/msaaddev'.grey
	]);

	// display table
	console.log('');
	console.log(table.toString());
};
