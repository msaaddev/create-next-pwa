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
	const currentDir = __dirname;

	// add tailwind configurations
	if (flags.indexOf('--tailwind') !== -1 || flags.indexOf('-t') !== -1) {
		await cli(name, flags, currentDir, true);
		end(name, true);
	} else {
		await cli(name, flags, currentDir);
		end(name);
	}
})();
