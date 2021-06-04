const welcome = require('cli-welcome');
const pkgJSON = require('../package.json');
const { Input } = require('enquirer');

/*
 *
 * get user question
 */
const getInput = async () => {
	const prompt = new Input({
		name: 'question',
		message: 'Your app name?'
	});

	let answer;

	try {
		answer = await prompt.run();
	} catch (error) {
		console.error(error);
	}
	return answer;
};

module.exports = async flags => {
	welcome({
		title: `${pkgJSON.name}`,
		tagLine: `by ${pkgJSON.author.name}`,
		description: `${pkgJSON.description}`,
		bgColor: `#ffffff`,
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
