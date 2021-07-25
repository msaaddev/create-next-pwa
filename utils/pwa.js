const ora = require('ora');
const execa = require('execa');
const { getPath, pwaPath } = require('../functions/path');
const chalk = require('chalk');
const manifest = require('../config/pwa/pwa-manifest.json');
const pwaPrettier = require('../config/pwa/prettier.json');
const scripts = require('../config/pwa/scripts.json');
const handleError = require('node-cli-handle-error');
const writeJsonFile = require('write-json-file');
const isItGit = require('is-it-git');
const exec = require('node-async-exec');

module.exports = async (name, currentDir, isTailwind = false, typescript) => {
	// get nextjs project path
	const { path, isWindows } = getPath(name);

	// pwa files path
	const pwaPaths = pwaPath(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		// check if .git directory exists
		const isGitDir = isItGit(path);

		// deleting .git directory
		if (isGitDir) {
			if (!isWindows) {
				await execa(`rm`, [`-rf`, `${pwaPaths.gitDir}`]);
			}
		}

		// updating manifest.json
		const pwaManifest = { ...manifest };
		pwaManifest.name = name;
		pwaManifest.short_name = name;

		if (!isWindows) {
			spinner.start(`${chalk.bold.dim('Adding PWA configurations...')}`);

			// creating prettuerrc.json file
			execa('touch', [`${pwaPaths.prettierFile}`]);

			// copying logos
			execa('cp', [`${pwaPaths.logo128x128}`, `${pwaPaths.publicDir}`]);
			execa('cp', [`${pwaPaths.logo512x512}`, `${pwaPaths.publicDir}`]);

			// coping config files
			!typescript &&
				execa('cp', [
					`${pwaPaths.documentFile}`,
					`${pwaPaths.pagesDir}`
				]);
			typescript &&
				execa('cp', [
					`${pwaPaths.tsDocumentFile}`,
					`${pwaPaths.pagesDir}`
				]);

			execa('cp', [`${pwaPaths.nextConfig}`, `${path}`]);
			spinner.succeed(`${chalk.white('PWA configurations added.')}`);

			// creating manifest.json file
			spinner.start(`${chalk.bold.dim('Creating manifest.json...')}`);

			execa('touch', [`${pwaPaths.manifestFile}`]);

			spinner.succeed(`${chalk.white('manifest.json created.')}`);

			spinner.start(`${chalk.bold.dim('Updating metadata files...')}`);

			await writeJsonFile(`${pwaPaths.manifestFile}`, pwaManifest);
			await writeJsonFile(`${pwaPaths.prettierFile}`, pwaPrettier);

			// updating scripts in Next.js PWA package.json file
			const pkgJSON = require(`${pwaPaths.writePkgJSON}`);
			const pwaPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${pwaPaths.writePkgJSON}`, pwaPkgJSON);
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
			!typescript &&
				execa('copy', [
					`${pwaPaths.winDocumentFile}`,
					`${pwaPaths.winPagesDir}`
				]);

			typescript &&
				execa('copy', [
					`${pwaPaths.winTsDocumentFile}`,
					`${pwaPaths.winPagesDir}`
				]);
			execa('copy', [`${pwaPaths.winNextConfig}`, `${path}`]);
			spinner.succeed(`${chalk.white('PWA configurations added.')}`);

			// creating manifest.json file
			spinner.start(`${chalk.bold.dim('Creating manifest.json...')}`);

			execa('copy', [`NUL`, `${pwaPaths.winManifestFile}`]);

			spinner.succeed(`${chalk.white('manifest.json created.')}`);

			spinner.start(`${chalk.bold.dim('Updating metadata files...')}`);

			await writeJsonFile(`${pwaPaths.winManifestFile}`, pwaManifest);
			await writeJsonFile(`${pwaPaths.winPrettierFile}`, pwaPrettier);

			// updating scripts in Next.js PWA package.json file
			const pkgJSON = require(`${pwaPaths.winWritePkgJSON}`);
			const pwaPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${pwaPaths.winWritePkgJSON}`, pwaPkgJSON);
		}

		spinner.succeed(`${chalk.white('metadata files updated.')}`);

		// installing packages
		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);

		await exec({ path, cmd: `npm install next-pwa ` });
		if (!isTailwind) {
			await exec({ path, cmd: `npm install -D prettier` });
			await exec({ path, cmd: `npm run format` });
		}

		spinner.succeed(`${chalk.white('Dependencies installed.')}`);
	} catch (err) {
		spinner.fail(`Couldn't convert Next.js app to PWA.`);
		handleError(`Something went wrong.`, err);
	}
};
