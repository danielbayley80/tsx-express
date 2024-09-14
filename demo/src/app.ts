import express from 'express';
import { initializeReactRenderer, ReactGlobalOptions } from 'tsx-express';


import Layout1 from "./views/Layout1"
import Layout2 from "./views/Layout2"
import LayoutChild from "./views/LayoutChild"

import Detail1, { AddressViewProps } from "./views/Address"
import { generateRandomAddress } from './address';
 

/* Locals are explicitly typed so we need to extend the locals type */
declare global {
      namespace Express {
            interface Locals {
                  title: string;
            }
      }
}

const port = 3000;
const app = express();

app.use(express.static('./src/public'))

/* */
initializeReactRenderer(app, {defaultLayout:Layout1} )


/* 
      setReactLayout can be used to set both the main and child layout.
      this can be useful for using different layouts in particular parts of your 
      app, when users login, etc.
*/
app.get('*', (req, res, next) => {
     // res.setReactLayouts("noLayout","noLayout")
      next();
})


app.get('/', (req, res, next) => {
      res.locals.title= "Address Layout One"
      res.renderReact(Detail1)
      next();
})

/*
      Here we override the default layout with Layout2
*/
app.get('/layout2', (req, res, next) => {
      res.locals.title= "Address Layout Two"
      res.renderReact(Detail1, undefined,{layout:Layout2})
      next();
})

/*
      Here we return the detail view with no Layout.
      This is handy for rendering partials for HTMX.
      We'll also populate the view with a random address.
*/

app.get('/address', (req, res, next) => {
      const props : AddressViewProps = generateRandomAddress();
      res.renderReact(Detail1, props, {layout:'noLayout', childLayout:'noLayout'})
      next();
})

app.listen(port, () => {
      console.log(`Demo app listening on port ${port}`)
})


export default app;