const cliTable = require('cli-table');
const colors = require('colors');

module.exports = () => {
	// create a table
	const table = new cliTable();
	table.push([
		' Star '.bgYellow.gray,
		'https://github.com/msaaddev/create-next-pwa'
	]);
	table.push([' Twitter '.bgCyan.gray, 'http://twitter.com/msaaddev']);

	// display table
	console.log(table.toString());
};

// get repo link and add it to the table
