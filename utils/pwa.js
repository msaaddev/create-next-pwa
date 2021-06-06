const ora = require('ora');
const execa = require('execa');
const jsonFile = require('jsonfile');
const { getPath, pwaPath } = require('../functions/path');
const chalk = require('chalk');
const manifest = require('../config/pwa/pwa-manifest.json');
const pwaPrettier = require('../config/pwa/prettier.json');
const packageJSON = require('../config/pwa/pwa-package.json');
const handleError = require('node-cli-handle-error');
const fs = require('fs');

module.exports = async (name, currentDir, isTailwind = false) => {
	// get nextjs project path
	const path = getPath(name);

	// pwa files path
	const pwaPaths = pwaPath(name, currentDir);

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

	// check if directory exists
	const filenames = fs.readdirSync(process.cwd());
	const isGitDir = filenames.indexOf(`.git`) !== -1 ? true : false;

	// spinner
	const spinner = ora();

	try {
		// deleting .git directory

		if (isGitDir) {
			if (!isWindows) {
				await execa(`rm`, [`-rf`, `${pwaPaths.gitDir}`]);
			} else {
				await execa(`rmdir`, [`/Q`, `/S`, `${pwaPaths.gitDir}`]);
			}
		}

		// creating prettier configuration
		spinner.start(`${chalk.bold.dim('Adding PWA configurations...')}`);
		execa('touch', [`${pwaPaths.prettierFile}`]);

		if (!isWindows) {
			// copying logos
			execa('cp', [`${pwaPaths.logo128x128}`, `${pwaPaths.publicDir}`]);
			execa('cp', [`${pwaPaths.logo512x512}`, `${pwaPaths.publicDir}`]);
			execa('cp', [`${pwaPaths.documentFile}`, `${pwaPaths.pagesDir}`]);
			execa('cp', [`${pwaPaths.nextConfig}`, `${path}`]);
		} else {
			// copying logos
			execa('copy', [`${pwaPaths.logo128x128}`, `${pwaPaths.publicDir}`]);
			execa('copy', [`${pwaPaths.logo512x512}`, `${pwaPaths.publicDir}`]);
			execa('copy', [`${pwaPaths.documentFile}`, `${pwaPaths.pagesDir}`]);
			execa('copy', [`${pwaPaths.nextConfig}`, `${path}`]);
		}

		spinner.succeed(`${chalk.green('PWA configurations added.')}`);

		// creating manifest.json file
		spinner.start(`${chalk.bold.dim('Creating manifest.json...')}`);
		execa('touch', [`${pwaPaths.manifestFile}`]);

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
		jsonFile.writeFile(`${pwaPaths.manifestFile}`, pwaManifest, err => {});
		jsonFile.writeFile(`${pwaPaths.prettierFile}`, pwaPrettier, err => {});
		jsonFile.writeFile(`${pwaPaths.writePkgJSON}`, pwaPkgJSON, err => {});
		spinner.succeed(`${chalk.green('metadata files updated.')}`);

		// installing packages
		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);
		await execa(`npm`, [`--prefix`, `${path}`, `install`]);

		if (!isTailwind) {
			await execa(`npm`, [
				`--prefix`,
				`${path}`,
				`install`,
				`--only=dev`
			]);
			await execa(`npm`, [`--prefix`, `${path}`, `run`, `format`]);
		}
		spinner.succeed(`${chalk.green('Dependencies installed.')}`);
	} catch (err) {
		spinner.fail(`Couldn't convert Next.js app to PWA.`);
		handleError(`Something went wrong.`, err);
	}
};
