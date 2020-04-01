import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "react-router"
import globalStyles from "~/styles/global.css?url"
import styles from "./styles.css?url"

export function NoChrome({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

NoChrome.links = () => [
  {
    rel: "dns-prefetch",
    href: "https://fonts.googleapis.com",
    crossOrigin: "anonymous",
    as: "style",
  },
  {
    rel: "dns-prefetch",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
    as: "style",
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
    crossOrigin: "anonymous",
    as: "style",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
    as: "style",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600;1,700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons&display=block",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
  },
  // {
  //   rel: "icon",
  //   href: "/images/harvest-archery-logo.svg",
  //   type: "image/svg+xml",
  // },
  {
    rel: "stylesheet",
    href: globalStyles,
  },
  {
    rel: "stylesheet",
    href: styles,
  },
]
