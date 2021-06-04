const cliTable = require('cli-table');
const colors = require('colors');

module.exports = () => {
	// create a table
	const table = new cliTable();
	table.push([
		' Star '.bgYellow.gray.bold,
		'https://github.com/msaaddev/create-next-pwa'.grey
	]);
	table.push([' Twitter '.bgCyan.gray.bold, 'http://twitter.com/msaaddev'.grey]);

	// display table
	console.log(table.toString());
};
