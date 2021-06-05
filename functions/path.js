const cwd = process.cwd();

/**
 *
 * @param {name} - name of the directory
 */
const getPath = name => {
	return `${cwd}/${name}`;
};

/**
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 */
const pwaPath = (name, currentDir) => {
	const path = getPath(name);

	return {
		gitDir: `${path}/.git`,
		prettierFile: `${path}/.prettierrc.json`,
		publicDir: `${path}/public`,
		pagesDir: `${path}/pages`,
		logo128x128: `${currentDir}/img/logo-128x128.png`,
		logo512x512: `${currentDir}/img/logo-512x512.png`,
		documentFile: `${currentDir}/config/pwa/_document.js`,
		nextConfig: `${currentDir}/config/pwa/next.config.js`,
		manifestFile: `${path}/public/manifest.json`,
		writePkgJSON: `${path}/package.json`
	};
};

module.exports = {
	getPath,
	pwaPath
};
