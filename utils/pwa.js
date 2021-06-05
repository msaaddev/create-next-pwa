const ora = require('ora');
const execa = require('execa');
const cwd = process.cwd();
const jsonFile = require('jsonfile');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const manifest = require('../config/pwa/pwa-manifest.json');
const pwaPrettier = require('../config/pwa/prettier.json');
const packageJSON = require('../config/pwa/pwa-package.json');
const handleError = require('node-cli-handle-error');

module.exports = async (name, currentDir) => {
	const spinner = ora();
	const path = `${cwd}/${name}`;

	try {
		// deleting .git directory
		await execa(`rm`, [`-rf`, `${path}/.git`]);

		// creating prettier configuration
		spinner.start(`${chalk.bold.dim('Creating PWA configurations...')}`);
		execa('touch', [`${path}/.prettierrc.json`]);

		// copying logos
		execa('cp', [`${currentDir}/img/logo-128x128.png`, `${path}/public`]);
		execa('cp', [`${currentDir}/img/logo-512x512.png`, `${path}/public`]);
		execa('cp', [`${currentDir}/config/pwa/_document.js`, `${path}/pages`]);
		execa('cp', [`${currentDir}/config/pwa/next.config.js`, `${path}`]);

		spinner.succeed(`${chalk.green('PWA configurations created.')}`);

		// creating manifest.json file
		spinner.start(`${chalk.bold.dim('Creating manifest.json...')}`);
		execa('touch', [`${path}/public/manifest.json`]);

		// adding content to manifest.json
		const pwaManifest = { ...manifest };
		pwaManifest.name = name;
		pwaManifest.short_name = name;
		spinner.succeed(`${chalk.green('manifest.json created.')}`);

		// adding content to package.json
		spinner.start(`${chalk.bold.dim('Updating metadata files...')}`);
		const pwaPkgJSON = { ...packageJSON };
		pwaPkgJSON.name = name;

		// writing data to files
		jsonFile.writeFile(
			`${path}/public/manifest.json`,
			pwaManifest,
			err => {}
		);
		jsonFile.writeFile(`${path}/.prettierrc.json`, pwaPrettier, err => {});
		jsonFile.writeFile(`${path}/package.json`, pwaPkgJSON, err => {});
		spinner.succeed(`${chalk.green('metadata files updated.')}`);

		// installing packages
		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);
		await execa(`npm`, [`--prefix`, `${path}`, `install`]);
		await execa(`npm`, [`--prefix`, `${path}`, `install`, `--only=dev`]);
		await execa(`npm`, [`--prefix`, `${path}`, `run`, `format`]);
		spinner.succeed(`${chalk.green('Dependencies installed.')}`);

		console.log('');
		console.log(
			logSymbols.info,
			chalk.bgGreen.bold(` Next.js PWA `).black,
			'created successfully.'
		);

		console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
		console.log(chalk.cyan(`cd`), `${name}`);
		console.log(chalk.cyan(`git`), `init`);
		console.log(chalk.cyan(`npm run dev`));
	} catch (err) {
		spinner.fail(`Couldn't convert Next.js app to PWA.`);
		handleError(`Something went wrong.`, err);
	}
};
