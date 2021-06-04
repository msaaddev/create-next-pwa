#!/usr/bin/env node

/**
 *
 * Author: Saad Irfan
 * GitHub: msaaddev
 * Twitter: https://twitter.com/msaaddev
 */

// importing files & packages
const init = require('./utils/init');
const cli = require('./utils/cli');
const end = require('./utils/end');

(module.exports = async () => {
	let flags = [];
	flags = [...process.argv.slice(2)];
	const name = await init(flags);

	// executes cli
	await cli(name, flags);
	end();
})();
