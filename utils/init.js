const welcome = require('cli-welcome');
const pkgJSON = require('../package.json')

module.exports = () => {
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
};
