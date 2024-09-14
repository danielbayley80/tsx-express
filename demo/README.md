 
 # React Views for Express

A simple React view engine for Express 

## Demo Project

In the repo there is a simple demo project using express, tailwind, tsx-express and HTMX.

 ![Demo app](/resources/demo.webp)

 To start the project do so from the `demo` folder :
 
```console {:copy}
npm run dev
```

> **NOTE** - The demo project references the local component not the npm package.

Firstly there is some basic setup along with the React views setup. In this example we're setting a default layout and no child layout.

```typescript {:copy}
initializeReactRenderer(app, {defaultLayout:Layout1} )
```

A generic route uses `setReactLayouts` to add a child layout. It accepts both child and main layout.

In this example it applies a child layout in all cases but it could be used based on a particular path , if a user is logged in etc.


```typescript {:copy}
app.get('*', (req, res, next) => {
      res.setReactLayouts(LayoutChild)
      next();
})
```

The default home route then renders the `Detail1` view.

```typescript {:copy}
app.get('/', (req, res, next) => {
      res.locals.title= "Address Layout One"
      res.renderReact(Detail1)
      next();
})
```

There is also a route that shows how to apply another layout at the route level

```typescript {:copy}
app.get('/layout2', (req, res, next) => {
      res.locals.title= "Address Layout Two"
      res.renderReact(Detail1, undefined,{layout:Layout2})
      next();
})
```

Finally there is an address route that responds with the address view and removes and layout or child layout. This is so the content can be loaded in an HTML element by HTMX without the layouts.

```typescript {:copy}
app.get('/address', (req, res, next) => {
      const props : AddressViewProps = generateRandomAddress();
      res.renderReact(Detail1, props, {layout:'noLayout', childLayout:'noLayout'})
      next();
})
```

When the `get address` button is clicked, HTMX calls the `address` route and a populated html form is returned.




[version]: https://badgen.net/github/tag/danielbayley80/tsx-express?label=Version&color=0f6bff
[license]: https://badgen.net/github/license/danielbayley80/tsx-express?label=License&color=0f6bff