"use client";

import { ReactNode, FC } from "react";
import "./styles/globals.scss";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";

interface Metadata {
  title: string;
  description: string;
}
const metadata: Metadata = {
  title: "Tests App",
  description: "Interview Task from Kameleon Company",
};

type LayoutProps = {
  children: ReactNode;
};

// Layout for main "/" route.
const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="https://img.icons8.com/metro/26/ok.png" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
