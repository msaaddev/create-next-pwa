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
const changeDir = require('in-folder');

module.exports = async (name, currentDir, isTailwind = false) => {
	// get nextjs project path
	const path = getPath(name);

	// pwa files path
	const pwaPaths = pwaPath(name, currentDir);

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

	// check if directory exists
	const filenames = fs.readdirSync(path);
	const isGitDir = filenames.indexOf(`.git`) !== -1 ? true : false;

	// spinner
	const spinner = ora();

	try {
		// deleting .git directory

		if (isGitDir) {
			if (!isWindows) {
				await execa(`rm`, [`-rf`, `${pwaPaths.gitDir}`]);
			} else {
				await execa(`rmdir`, [`/Q`, `/S`, `${pwaPaths.winGitDir}`]);
			}
		}

		// creating prettier configuration
		spinner.start(`${chalk.bold.dim('Adding PWA configurations...')}`);

		if (!isWindows) {
			// creating prettuerrc.json file
			execa('touch', [`${pwaPaths.prettierFile}`]);

			// copying logos
			execa('cp', [`${pwaPaths.logo128x128}`, `${pwaPaths.publicDir}`]);
			execa('cp', [`${pwaPaths.logo512x512}`, `${pwaPaths.publicDir}`]);

			// coping config files
			execa('cp', [`${pwaPaths.documentFile}`, `${pwaPaths.pagesDir}`]);
			execa('cp', [`${pwaPaths.nextConfig}`, `${path}`]);
		} else {
			// creating prettuerrc.json file
			execa('copy', [`NUL`, `${pwaPaths.prettierFile}`]);

			// copying logos
			execa('copy', [
				`${pwaPaths.winLogo128x128}`,
				`${pwaPaths.winPublicDir}`
			]);
			execa('copy', [
				`${pwaPaths.winLogo512x512}`,
				`${pwaPaths.winPublicDir}`
			]);

			// coping config files
			execa('copy', [
				`${pwaPaths.winDocumentFile}`,
				`${pwaPaths.winPagesDir}`
			]);
			execa('copy', [`${pwaPaths.winNextConfig}`, `${path}`]);
		}

		spinner.succeed(`${chalk.green('PWA configurations added.')}`);

		// creating manifest.json file
		spinner.start(`${chalk.bold.dim('Creating manifest.json...')}`);

		if (!isWindows) {
			execa('touch', [`${pwaPaths.manifestFile}`]);
		} else {
			execa('copy', [`NUL`, `${pwaPaths.winManifestFile}`]);
		}

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
		if (!isWindows) {
			jsonFile.writeFile(
				`${pwaPaths.manifestFile}`,
				pwaManifest,
				err => {}
			);
			jsonFile.writeFile(
				`${pwaPaths.prettierFile}`,
				pwaPrettier,
				err => {}
			);
			jsonFile.writeFile(
				`${pwaPaths.writePkgJSON}`,
				pwaPkgJSON,
				err => {}
			);
		} else {
			jsonFile.writeFile(
				`${pwaPaths.winManifestFile}`,
				pwaManifest,
				err => {}
			);
			jsonFile.writeFile(
				`${pwaPaths.winPrettierFile}`,
				pwaPrettier,
				err => {}
			);
			jsonFile.writeFile(
				`${pwaPaths.winWritePkgJSON}`,
				pwaPkgJSON,
				err => {}
			);
		}
		spinner.succeed(`${chalk.green('metadata files updated.')}`);

		// installing packages
		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);

		if (!isWindows) {
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
		} else {
			// change directory
			changeDir(name, () => process.cwd());

			execa(`npm`, [`install`]);
			if (!isTailwind) {
				execa(`npm`, [`install`, `--only=dev`]);
				execa(`npm`, [`run`, `format`]);
			}
		}

		spinner.succeed(`${chalk.green('Dependencies installed.')}`);
	} catch (err) {
		spinner.fail(`Couldn't convert Next.js app to PWA.`);
		handleError(`Something went wrong.`, err);
	}
};
