// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <title>Static Code Analysis Tool</title>
        </Head>
        <body className=" bg-blue-50 dark:bg-gray-900">
            <Main />
            <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
