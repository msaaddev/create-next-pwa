const ora = require('ora');
const execa = require('execa');
const writeJsonFile = require('write-json-file');
const { getPath, tailwindPath } = require('../functions/path');
const chalk = require('chalk');
const handleError = require('node-cli-handle-error');
const packageJSON = require('../config/tailwind/tailwind-package.json');
const execAsync = require('../functions/exec-async');

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
		await writeJsonFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON)

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

			execa('cp', [
				`${tailwindPaths.writeAppJS}`,
				`${tailwindPaths.pagesDir}`
			]);
			execa('cp', [
				`${tailwindPaths.writeGlobalCSS}`,
				`${tailwindPaths.stylesDir}`
			]);
		} else {
			// copying tailwind config files
			execa('copy', [`${tailwindPaths.winPostCSSConfig}`, `${path}`]);
			execa('copy', [`${tailwindPaths.winTailwindConfig}`, `${path}`]);

			// removing existing files
			await execa(`del`, [`${tailwindPaths.winAppjsPath}`]);
			await execa(`del`, [`${tailwindPaths.winGlobalCSS}`]);

			// copying _app.js and global css
			execa('copy', [
				`${tailwindPaths.winWriteAppJS}`,
				`${tailwindPaths.winPagesDir}`
			]);
			execa('copy', [
				`${tailwindPaths.winWriteGlobalCSS}`,
				`${tailwindPaths.winStylesDir}`
			]);
		}

		// installing dev dependencies
		if (!isWindows) {
			await execa(`npm`, [
				`--prefix`,
				`${path}`,
				`install`,
				`--only=dev`
			]);
			await execa(`npm`, [`--prefix`, `${path}`, `run`, `format`]);
		} else {
			try {
				const instDevDependencies = `npm install --only=dev`;
				const formatCode = `npm run format`;

				await execAsync(name, instDevDependencies);
				await execAsync(name, formatCode);
			} catch (err) {
				handleError(err);
			}
		}

		// succeed
		spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
	} catch (err) {
		spinner.fail(`Couldn't add tailwind configurations.`);
		handleError(`Something went wrong.`, err);
	}
};
