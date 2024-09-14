 
# React Views for Express

A simple React view engine for Express 

[![][version]](https://www.npmjs.com/package/tsx-express)

## Background

I prefer old school approach to websites, where the server is responsible for state management and serves up HTML content with a sprinkling of interactivity added on the front end. I also like type safety, intellisense, etc. More recently I've been using HTMX and looking for a new view engine. I've used Handlebars, ejs, etc. but none really fit the bill. 

My main design goals were :

- Similar approach as HBS / EJS
- Specify a default / global master layout
- Be able to override this at the route level
- Pass a view at the route level
- Automatically expose locals to the view
- Pass custom properties to the view 
- Strongly typed where possible

Enter tsx-express, a simple React view engine for express. 

> **DISCLAIMER** - I am not a professional developer, this is a side/weekend project.

Contexts and other features are not implemented to keep this as a simple view engine, similar to other view engines.

## Getting started

Setup is pretty easy. 

You'll need `express`, `react` and `tsx-express`.

```console {:copy}
npm i tsx-express
```

## App setup

Setup express as normal and use `initializeReactRenderer` helper method in your main application file passing in your express `app` and optional `ReactGlobalOptions` options. ReactGlobalOptions allows you to specify both a default and child layout.

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

app.get('/', (req, res, next) => {
      const options : ReactResponseOptions = {}
      const properties : any = {}
      res.renderReact(MyView, properties, options )
})

```

You'll notice that your properties are strongly typed according to your view.

![typed renderReact method](/resources/renderReactMethod.webp)

If you want to override the default layout or child layout at the route level you can pass in `ReactResponseOptions`.

```typescript {:copy}
import Layout2 from "../views/layouts/Layout2"
import MyView from "../views/MyView"

app.get('/', (req, res, next) => {
      const properties : any = {}
      res.renderReact(MyView, properties, {layout:Layout2} );
})
```

If you want to remove a layout at the route level you can use the `NoLayout` value.

```typescript {:copy}
import NoLayout from 'tsx-express'
import MyView from "../views/MyView"

app.get('/', (req, res, next) => {
      const properties : any = {}
      res.renderReact(MyView, properties, {layout:NoLayout} );
})
```

## Overriding layouts

Additional `setReactLayouts` method on the response object allows you to set the layout and child layout.

This is handy for use elsewhere in your application when you might want to override layouts based on some other criteria. For example, for areas of an application, if a user is logged in, etc.

```typescript {:copy}
app.get('*', (req, res, next) => {
      if (res.locals.isAuthenticated) {
            res.setReactLayouts( NewChildLayout, MainLayout);
      }
      next();
})
```

## Layouts 

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

## Views

Similarly you may want to pass locals to your views. Again you can use the `IViewProps` interface, extend this, or create your own.

```typescript {:copy}
export default function MyView({ locals }: IViewProps): ReactElement {
      return (
      <>

      </>
      )
}
```

## HTMX Tip

When using HTMX it can be useful to render a route with and without layouts so it can be loaded directly or from an HTMX request. 

You can achieve this by detecting various HTMX headers such as `hx-request` and removing your layouts as required.

```typescript {:copy}
if (req.headers["hx-request"]) options = {layout:'noLayout', childLayout:'noLayout'}
res.renderReact(MyView,undefined,options)
```

If this is a pattern you use more generally you could also catch this similar to :

```typescript {:copy}
app.get('*', (req, res, next) => {
      if (req.headers["hx-request"]) {
            res.setReactLayouts( 'noLayout', 'noLayout');
      }
      next();
})
```

[version]: https://badgen.net/github/tag/danielbayley80/tsx-express?label=Version&color=0f6bff
[license]: https://badgen.net/github/license/danielbayley80/tsx-express?label=License&color=0f6bff