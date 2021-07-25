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

	// check if the project is typescript
	const typescript =
		flags.indexOf('-ts') !== -1 || flags.indexOf('--typescript') !== -1
			? true
			: false;

	// check if the project needs tailwind
	const tailwind =
		flags.indexOf('--tailwind') !== -1 || flags.indexOf('-t') !== -1
			? true
			: false;

	// add tailwind configurations
	if (tailwind) {
		const isEnd = await cli(name, flags, currentDir, typescript, tailwind);
		isEnd && end(name, typescript, tailwind);
	} else {
		const isEnd = await cli(name, flags, currentDir, typescript);
		isEnd && (await end(name, typescript));
	}
})();
