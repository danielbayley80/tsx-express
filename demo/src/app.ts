import express from 'express';
import { initializeReactRenderer, ReactGlobalOptions } from 'tsx-express';


import Layout1 from "./views/Layout1"
import Layout2 from "./views/Layout2"
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

      res.renderReact(Detail1, props, {layout:'noLayout'})
      next();
})

app.listen(port, () => {
      console.log(`Demo app listening on port ${port}`)
})


export default app;