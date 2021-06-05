const cliTable = require('cli-table');
const colors = require('colors');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

module.exports = (name, isTailwind = false) => {
	console.log('');

	if (!isTailwind) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` Next.js PWA `),
			'created successfully'
		);
	} else {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` Next.js PWA `),
			`with ${chalk.bgGreen.hex(`#000000`).bold(` Tailwind `)}`,
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
		// ' Star '.bold.bgYellow.black,
		`${chalk.bgYellow.hex(`#000000`).bold(` Star `)}`,
		'https://github.com/msaaddev/create-next-pwa'.grey
	]);
	table.push([
		`${chalk.bgCyan.hex(`#000000`).bold(` Follow `)}`,
		'http://twitter.com/msaaddev'.grey
	]);

	// display table
	console.log('');
	console.log(table.toString());
};
