<img src="assets/cover.jpg" alt="cover">
<div align="center">
	<h1>⚡️ create-next-pwa</h1>
	<img src="https://img.shields.io/npm/v/create-next-pwa?color=%23000000" alt="version">
	<img src="https://img.shields.io/npm/dt/create-next-pwa?color=%23000000" alt="downloads">
	<img src="https://img.shields.io/npm/l/create-next-pwa?color=%23000000" alt="license">
</div>
<br>

A **cross-platform Node.js based CLI tool** that creates **Progressive Web App (PWA)** with **Next.js**. You can also integrate **tailwind** with the Next.js PWA using this CLI with a single command.

## 🎯 Features

- Generates boilerplate code for **Next.js PWA** with a single command
- **Tailwind** integration with the Next.js PWA
- Integrated **Prettier** to easily format the code with `npm run format`

## 📦 Installation

```sh
# install the CLI globally
npm i -g create-next-pwa

# use it with npx (recommended)
npx create-next-pwa [app_name]
```

## 🚀 Usage

Navigate to the folder you want to have your Next.js PWA.

```sh
# using npx
npx create-next-pwa@latest [app_name]

# if you have installed globally
create-next-pwa [app_name]

# Next.js PWA with tailwind integration using npx
npx create-next-pwa@latest [app_name] --tailwind

# Next.js PWA with tailwind integration if you have globally installed the CLI
create-next-pwa [app_name] --tailwind

# without giving app name in terminal using npx
npx create-next-pwa@latest

# without giving app name in terminal using npx and tailwind integration
npx create-next-pwa@latest --tailwind

# without giving app name in terminal if installed globally
create-next-pwa

# without giving app name in terminal if install globally along with tailwind integration
create-next-pwa --tailwind
```

## 🎩 Demo

```sh
# using npx
npx create-next-pwa [app_name]
```

<img src="assets/usage-3.gif" alt="with npx">

```sh
# integrate tailwind in the Next.js PWA
npx create-next-pwa [app_name] --tailwind
```

<img src="assets/usage-4.gif" alt="integration of tailwind">

```sh
# if you have installed globally
create-next-pwa [app_name]
```

<img src="assets/usage-1.gif" alt="usage with app name">

```sh
# you can also just use the create-next-pwa command
create-next-pwa
```

<img src="assets/usage-2.gif" alt="usage without app name">

## 👨🏻‍💻 Contributing

Make sure you read the [contributing guidelines](https://github.com/msaaddev/create-next-pwa/blob/master/contributing.md) before opening a PR.

## 🔑 License & Conduct

- MIT © [Saad Irfan](https://github.com/msaaddev)
- [Code of Conduct](https://github.com/msaaddev/create-next-pwa/blob/master/code-of-conduct.md)
