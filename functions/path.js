const cwd = process.cwd();

/**
 *
 * @param {name} - name of the directory
 */
const getPath = name => {
	const slash = '\\';

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

	if (isWindows) return `${cwd}${slash}${name}`;
	return `${cwd}/${name}`;
};

/**
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 */
const pwaPath = (name, currentDir) => {
	const path = getPath(name);
	const slash = '\\';

	return {
		gitDir: `${path}/.git`,
		winGitDir: `${path}${slash}.git`,
		prettierFile: `${path}/.prettierrc.json`,
		winPrettierFile: `${path}${slash}.prettierrc.json`,
		publicDir: `${path}/public`,
		winPublicDir: `${path}${slash}public`,
		pagesDir: `${path}/pages`,
		winPagesDir: `${path}${slash}pages`,
		logo128x128: `${currentDir}/img/logo-128x128.png`,
		winLogo128x128: `${currentDir}${slash}img${slash}logo-128x128.png`,
		logo512x512: `${currentDir}/img/logo-512x512.png`,
		winLogo512x512: `${currentDir}${slash}img${slash}logo-512x512.png`,
		documentFile: `${currentDir}/config/pwa/_document.js`,
		winDocumentFile: `${currentDir}${slash}config${slash}pwa${slash}_document.js`,
		nextConfig: `${currentDir}/config/pwa/next.config.js`,
		winNextConfig: `${currentDir}${slash}config${slash}pwa${slash}next.config.js`,
		manifestFile: `${path}/public/manifest.json`,
		winManifestFile: `${path}${slash}public${slash}manifest.json`,
		writePkgJSON: `${path}/package.json`,
		winWritePkgJSON: `${path}${slash}package.json`
	};
};

/**
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 */
const tailwindPath = (name, currentDir) => {
	const path = getPath(name);
	const slash = '\\';

	return {
		pkgJSON: `${path}/package.json`,
		winPkgJSON: `${path}${slash}package.json`,
		postCSSConfig: `${currentDir}/config/tailwind/postcss.config.js`,
		winPostCSSConfig: `${currentDir}${slash}config${slash}tailwind${slash}postcss.config.js`,
		tailwindConfig: `${currentDir}/config/tailwind/tailwind.config.js`,
		winTailwindConfig: `${currentDir}${slash}config${slash}tailwind${slash}tailwind.config.js`,
		appjsPath: `${path}/pages/_app.js`,
		winAppjsPath: `${path}${slash}pages${slash}_app.js`,
		globalCSS: `${path}/styles/globals.css`,
		winGlobalCSS: `${path}${slash}styles${slash}globals.css`,
		writeAppJS: `${currentDir}/config/tailwind/_app.js`,
		winWriteAppJS: `${currentDir}${slash}config${slash}tailwind${slash}_app.js`,
		writeGlobalCSS: `${currentDir}/config/tailwind/globals.css`,
		winWriteGlobalCSS: `${currentDir}${slash}config${slash}tailwind${slash}globals.css`,
		pagesDir: `${path}/pages`,
		winPagesDir: `${path}${slash}pages`,
		stylesDir: `${path}/styles`,
		winStylesDir: `${path}${slash} styles`
	};
};

module.exports = {
	getPath,
	pwaPath,
	tailwindPath
};
