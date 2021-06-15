## Changes Across Different Versions of create-next-pwa

### v3.3.1

- Fixed .git directory deletion

### v3.2.0

- Removed code reducdancies
- Improved code structure
- Removed in-folder
- Added node-async-exec because of its change directory and cross-platform nature
- Fixed outdating future dependencies bug [#21](https://github.com/msaaddev/create-next-pwa/issues/21)
- Added custom error message if the project folder already exists

### v2.5.0 to v3.1.9

- Cross platform directory deletion
- Used copy command for windows to copy files
- Took care of file creation for windows
- Fixed npm dependency installation for windows by making exec a promise
- Fixed file paths for Windows
- Fixed git directory deletion for macos
- Introduced check for update to notify the user if there is an update available of the CLI
- Added err handlers
- Removed jsonfile and used json-write-file instead


### v2.4.0

- Integration of tailwind for Next.js PWAs
- Code refactoring
- One file path handling
- Fixed flags and input bug
- Improved UI

### v1.3.0

- Integrated create-next-app
- Generated PWA
- Integrated prettier
