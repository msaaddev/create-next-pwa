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
		app_name: { desc: `Your Next.js Progessive Web App name` }
	};

	const flags = {
		tailwind: {
			desc: `Integrated tailwind in the PWA`,
			default: 'false'
		}
	};

	const helpText = meowHelp({
		name: `${pkgJSON.name}`,
		commands,
		flags
	});

	meow(helpText, { flags });
};

module.exports = async flags => {
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

	let question = '';

	if (flags.length === 0) {
		while (question === '') {
			question = await getInput(); // Make sure user enters a question that's not an empty string
		}
	} else {
		question = flags[0];
	}

	return question;
};
