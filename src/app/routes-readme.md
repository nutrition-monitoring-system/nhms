#### README Template for /app Folder in Next.js Project

##### Introduction

Welcome to the README file for the `/app` folder in your Next.js project. This README will provide an overview of the different pages and components within the `/app` folder, as well as instructions on how to use them.

##### Pages

The `/app` folder contains several pages that are unique to specific routes. Each page is defined in a `page.js` file and can be accessed through its corresponding route. Here are the pages included in the `/app` folder:

- Home Page: The home page is accessible through the root URL. It can be found in the `page.js` file inside the `/app` directory. Here is an example of how to define the home page:

```jsx
export default function Page() {
  return <h1>Hello, Home page!</h1>;
}
```

- Admin Page: The admin page is accessible through the `/admin` URL. It can be found in the `dashboard/page.js` file inside the `/app` directory. Here is an example of how to define the admin page:

```jsx
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>;
}
```

##### Layout Component

The `/app` folder also contains a `Layout.js` component that is used to provide a consistent layout for the pages. The `Layout.js` component is imported in each page and wraps the content of the page. Here is an example of how to use the `Layout.js` component:

```jsx
import Head from "next/head";
import Header from "./Header";
import NavBar from "./NavBar";

const Layout = (props) => (
  <div className="Layout">
    <Head>
      <title>WHATABYTE</title>
    </Head>
    <Header />
    <div className="Content">{props.children}</div>
    <NavBar />
  </div>
);

export default Layout;
```

##### Additional Files

In addition to the pages and the layout component, the `/app` folder may also contain other files such as `globals.css` for global styles.
