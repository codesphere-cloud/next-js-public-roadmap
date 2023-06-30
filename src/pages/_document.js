import { Html, Head, Main, NextScript } from "next/document";
import { get } from "idb-keyval";

export default function Document({ db }) {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.db = ${JSON.stringify(db)};`,
          }}
        />
      </body>
    </Html>
  );
}
