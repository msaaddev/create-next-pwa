const ora = require('ora');
const execa = require('execa');
const { getPath, tailwindPath } = require('../functions/path');
const chalk = require('chalk');
const handleError = require('node-cli-handle-error');
const exec = require('node-async-exec');

module.exports = async (name, currentDir) => {
	// get nextjs project path
	const { path, isWindows } = getPath(name);
	const tailwindPaths = tailwindPath(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		spinner.start(`${chalk.bold.dim('Adding tailwind configurations...')}`);

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

		await exec({
			path,
			cmd: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest prettier`
		});
		await { path, cmd: `npm run format` };

		// succeed
		spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
	} catch (err) {
		spinner.fail(`Couldn't add tailwind configurations.`);
		handleError(`Something went wrong.`, err);
	}
};
