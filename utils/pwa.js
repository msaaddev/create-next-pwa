const ora = require('ora');
const execa = require('execa');
const cwd = process.cwd();
const jsonFile = require('jsonfile');
const chalk = require('chalk');
const manifest = require('../pwa/pwa-manifest.json');
const pwaPrettier = require('../pwa/prettier.json');
const packageJSON = require('../pwa/pwa-package.json');

module.exports = async name => {
	const spinner = ora();
	const path = `${cwd}/${name}`;

	// creating prettier configuration
	execa('touch', [`${path}/.prettierrc.json`]);

	// creating manifest.json file
	execa('touch', [`${path}/public/manifest.json`]);

	// copying logos
	execa('cp', [`./img/logo-128x128.png`, `${path}/public`]);
	execa('cp', [`./img/logo-512x512.png`, `${path}/public`]);
	execa('cp', [`./pwa/_document.js`, `${path}/pages`]);
	execa('cp', [`./pwa/next.config.js`, `${path}`]);

	// adding content to manifest.json
	const pwaManifest = { ...manifest };
	pwaManifest.name = name;
	pwaManifest.short_name = name;

	// adding content to package.json
	const pwaPkgJSON = { ...packageJSON };
	pwaPkgJSON.name = name;

	// writing data to files
	jsonFile.writeFile(`${path}/public/manifest.json`, pwaManifest, err => {});
	jsonFile.writeFile(`${path}/.prettierrc.json`, pwaPrettier, err => {});
	jsonFile.writeFile(`${path}/package.json`, pwaPkgJSON, err => {});

	// installing packages
	spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);
	await execa(`npm`, [`--prefix`, `${path}`, `install`]);
	await execa(`npm`, [`--prefix`, `${path}`, `install`, `--only=dev`]);
	await execa(`npm`, [`--prefix`, `${path}`, `run`, `format`]);
	spinner.succeed(`${chalk.green('Dependencies installed.')}`);
};
