import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/logo-128x128.png" />
					<link rel="theme-color" href="#fff" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
