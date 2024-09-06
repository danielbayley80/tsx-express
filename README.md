 

# React Views for Express

A simple React view engine for Express 

[![][version]](https://www.npmjs.com/package/tsx-express)

## Background

I prefer old school approach to websites, where the server is responsible for state management and serves up HTML content with a sprinkling of interactivity added on the front end. I also like type safety, intellisense, etc. More recently I've been using HTMX and looking for a new view engine. I've used Handlebars, ejs, etc. but none really fit the bill. 

The main things I wanted to achieve were :

- Similar approach as HBS / EJS
- Specify a default / global master layout
- Be able to override this at the route level
- Pass a view at the route level
- Automatically expose locals to the view
- Pass custom properties to the view 
- Strongly typed where possible

Enter tsx-express, a simple React view engine for express. 

> **DISCLAIMER** - I am not a professional developer, this is a side/weekend project.

## Getting started

Setup is pretty easy. 

You'll need `express`, `react` and `tsx-express`.

```console {:copy}
npm i tsx-express
```

## Layouts and views

Your layouts will need a `locals` and `children` property. You can omit `locals` if you do not need them in your layout, but views will not render without a `children` element. You can extend the `ILayoutProps` interface or create your own. You do not need to set locals/children values as they are passed by the view engine.

```typescript {:copy}
export default function MyLayout({ children, locals }: ILayoutProps): ReactElement {
      return (
      <>
            {children}
      </>
      )
}
```

Similarly you may want to pass locals to your views. Again you can use the `IViewProps` interface, extend this, or create your own.

```typescript {:copy}
export default function MyLayout({ locals }: IViewProps): ReactElement {
      return (
      <>

      </>
      )
}
```

Note that locals are also typed and need to be defined or you'll get a "Property 'message does not exist" error. You can extend locals as follows :

```typescript {:copy}
declare global {
      namespace Express {
          interface Locals {
              yourProperty: string;
          }
      }
  }
```

## App setup

Setup express as normal and use `initializeReactRenderer` helper method in your main application file passing in your express `app` and optional `options` (ReactGlobalOptions)`.

```typescript {:copy}
import express from 'express';
import { initializeReactRenderer } from 'tsx-express';
import Layout1 from "../views/layouts/Layout1"

const app = express();

initializeReactRenderer(app, {defaultLayout:Layout1});
```

## Route setup

In your express routes you then call the `renderReact` method, passing in your view component, any `properties` you want to pass to the view, and optionally response `options` (ReactResponseOptions).

```typescript {:copy}
import MyView from "../views/MyView"

const options : ReactResponseOptions = {}
const properties : any = {}
res.renderReact(MyView, properties, options )
```

 You'll notice that your properties are strongly typed according to your view.

 ![typed renderReact method](/resources/renderReactMethod.webp)

If you want to override the default layout:

```typescript {:copy}
import Layout2 from "../views/layouts/Layout2"
res.renderReact(MyView, properties, {layout:Layout2} )
```

If you want to remove the default layout at the route level you can use the `NoLayout` value.

```typescript {:copy}
import NoLayout from 'tsx-express'
res.renderReact(MyView, properties, {layout:NoLayout} )
```

I have deliberately not implemented contexts and other features to keep this as a simple view engine similar to other view engines.

## Demo Project

In the repo there is a simple demo project using express, tailwind, tsx-express and HTMX.

It comprises of 3 express routes which :
- Display a basic page with a detail component
- Display the same basic page with an alternate layout
- Display the detail component without the component

 ![typed renderReact method](/resources/demo.webp)

On either of the first two pages, when you click the `get address` button, HTMX calls the 3rd route and a populated html form is returned.

To start the project use:
```console {:copy}
npm run dev
```

> **NOTE** - The demo project references the local component not the npm package.

## Contributing

[version]: https://badgen.net/github/tag/danielbayley80/tsx-express?label=Version&color=1AD1A5
[license]: https://badgen.net/github/license/danielbayley80/tsx-express?label=License&color=1AD1A5