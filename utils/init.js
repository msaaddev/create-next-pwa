const welcome = require('cli-welcome');
const pkgJSON = require('../package.json');
const { Input } = require('enquirer');
const meow = require('meow');
const meowHelp = require('cli-meow-help');

/*
 *
 * get user question
 */
const getInput = async () => {
	const prompt = new Input({
		name: 'question',
		message: 'Your app name?',
		hint: 'kebab-case only'
	});

	let answer;

	try {
		answer = await prompt.run();
	} catch (error) {
		console.error(error);
	}
	return answer;
};

/**
 *
 *	generates cli help text
 */
const cliHelpText = () => {
	const commands = {
		name: { desc: `Name of the your Next.js PWA` }
	};

	const flags = {
		typescript: {
			desc: `Use TypeScript instead of JavaScript in the PWA`,
			alias: `ts`
		},
		tailwind: {
			desc: `Integrate Tailwind in the PWA`,
			alias: `t`
		}
	};

	const helpText = meowHelp({
		name: `create-next-pwa`,
		commands,
		flags
	});

	meow(helpText, { flags });
};

module.exports = async flags => {
	// welcome header
	cliHelpText() ||
		welcome({
			title: `${pkgJSON.name}`,
			tagLine: `by ${pkgJSON.author.name}`,
			description: `${pkgJSON.description}`,
			bgColor: `#4783d4`,
			color: `#000000`,
			bold: true,
			clear: true,
			version: `${pkgJSON.version}`
		});

	let name = '';

	let terminalInput = false;

	for (let i = 0; i < flags.length; i++) {
		let tempName = flags[i];

		if (tempName[0] !== '-' && tempName[1] !== '-') {
			name = tempName;
			terminalInput = true;
		}
	}

	if (!terminalInput) {
		while (name === '') {
			name = await getInput();
		}
	}

	return name;
};
