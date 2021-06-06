const ora = require('ora');
const execa = require('execa');
const { exec } = require('child_process');
const jsonFile = require('jsonfile');
const { getPath, tailwindPath } = require('../functions/path');
const chalk = require('chalk');
const handleError = require('node-cli-handle-error');
const packageJSON = require('../config/tailwind/tailwind-package.json');

module.exports = async (name, currentDir) => {
	// get nextjs project path
	const path = getPath(name);
	const tailwindPaths = tailwindPath(name, currentDir);

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

	// spinner
	const spinner = ora();

	try {
		spinner.start(`${chalk.bold.dim('Adding tailwind configurations...')}`);

		// writing content to package.json for tailwind
		const tlwPkgJSON = { ...packageJSON };
		tlwPkgJSON.name = name;
		jsonFile.writeFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON, err => {});

		// copying tailwind config files
		execa('cp', [`${tailwindPaths.postCSSConfig}`, `${path}`]);
		execa('cp', [`${tailwindPaths.tailwindConfig}`, `${path}`]);

		if (!isWindows) {
			// copying tailwind config files
			execa('cp', [`${tailwindPaths.postCSSConfig}`, `${path}`]);
			execa('cp', [`${tailwindPaths.tailwindConfig}`, `${path}`]);

			// removing existing files
			await execa(`rm`, [`-rf`, `${tailwindPaths.appjsPath}`]);
			await execa(`rm`, [`-rf`, `${tailwindPaths.globalCSS}`]);

			execa('cp', [`${tailwindPaths.writeAppJS}`, `${path}/pages`]);
			execa('cp', [`${tailwindPaths.writeGlobalCSS}`, `${path}/styles`]);
		} else {
			// copying tailwind config files
			execa('copy', [`${tailwindPaths.postCSSConfig}`, `${path}`]);
			execa('copy', [`${tailwindPaths.tailwindConfig}`, `${path}`]);

			// removing existing files
			await execa(`del`, [`${tailwindPaths.appjsPath}`]);
			await execa(`del`, [`${tailwindPaths.globalCSS}`]);

			// copying _app.js and global css
			execa('copy', [`${tailwindPaths.writeAppJS}`, `${path}/pages`]);
			execa('copy', [
				`${tailwindPaths.writeGlobalCSS}`,
				`${path}/styles`
			]);
		}

		// installing dev dependencies
		if(!isWindows) {
			await execa(`npm`, [`--prefix`, `${path}`, `install`, `--only=dev`]);
			await execa(`npm`, [`--prefix`, `${path}`, `run`, `format`]);

		} else {
			process.chdir(path);
			exec(`npm install --only=dev && npm run format`);
		}

		// succeed
		spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
	} catch (err) {
		spinner.fail(`Couldn't add tailwind configurations.`);
		handleError(`Something went wrong.`, err);
	}
};
