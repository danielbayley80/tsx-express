import { Express, Response } from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export type ReactLayout<P = any> = React.FC<P> | NoLayout;

declare global {
      namespace Express {
          interface Response {
              renderReact: <P>(component: React.FC<P>, props?: P, options?: ReactResponseOptions) => void;
              setReactLayouts: <P>(childLayout?: ReactLayout ,layout?: ReactLayout) => void;
          }
      }
  }

  export interface ILayoutProps {
      children : React.ReactNode;
      locals: Express.Locals;
  }

  export interface IViewProps {
      locals: Express.Locals;
  }

/**
 * Indicates not to use a layout on this request
 */
export type NoLayout = "noLayout";

/**
 * Global options for every request.
 */
export interface ReactGlobalOptions {
      defaultLayout?: ReactLayout;       // adds a default layout to all requests.
      defaultChildLayout?: ReactLayout;       // adds a default layout to all requests.
}

/**
 * Options applied per requesting on rendering.
 */
export interface ReactResponseOptions {
      layout?: React.FC<any> | NoLayout;      // overrides the layout for this request with either a layout or removing the default.
      childLayout?: React.FC<any> | NoLayout;
}

/**
 * Register the renderReact function
 */
export function initializeReactRenderer(app: Express, options?: ReactGlobalOptions) {
      app.use((req, res, next) => {
            res.renderReact = getRenderReact(res, options);
            res.setReactLayouts = (childLayout?: ReactLayout,layout?: ReactLayout) => {
                  if (!options) { options = {} }
                  if (childLayout) options.defaultChildLayout = childLayout;
                  if (layout) options.defaultLayout = layout;
            };
            next();
      })
}

/**
 * Sets up the render function
 */
function getRenderReact(res: Response, globalOptions?: ReactGlobalOptions) {
      return (component: React.FC<any>, props: any, responseOptions?: ReactResponseOptions) => {
            if (!props) props = {};
            props.locals = res.locals;
            const html = getHtml(component, props, globalOptions, responseOptions)
            return res.send(html);
      }
}

/**
 * Render function. Takes the component, properties and options to create an HTML output string.
 */
export function getHtml(
      view: React.FC<any>,
      props?: any,
      globalOptions?: ReactGlobalOptions,
      responseOptions?: ReactResponseOptions
): string {

      // get the layout giving precedence to the current response options.
      // if the value is noLayout we explicitly remove the layout.
      let layout = responseOptions?.layout || globalOptions?.defaultLayout
      if (layout === "noLayout") layout = undefined;

      let layoutChild = responseOptions?.childLayout || globalOptions?.defaultChildLayout
      if (layoutChild === "noLayout") layoutChild = undefined;

      if (!isValidLayout(layout)) return "<!-- Invalid layout -->"
      if (!isValidView(view)) return "<!-- Invalid view -->"

      try {

            // create the content element from the component and properties.
            let element = React.createElement(view, props)
            if (layoutChild) {  element = React.createElement(layoutChild, props, element) }
            if (layout) {  element = React.createElement(layout, props, element) }
            const html = ReactDOMServer.renderToString(element);
            
            // by design react behavior adds empty comments to help with hydrating on the client
            // as this is a backend rendering of a view we do not need them so remove.
            return html.replace("<!-- -->","");

      } catch (error) {
            console.error('Error rendering : ', error);
            return '<!-- Rendering error -->';
      }

}

function isValidLayout(view:any) {
      if (!view) return true;
      if (view?.prototype?.isReactComponent) return false;
      if ( typeof view === 'function' ) return true;
      return false;
  }

function isValidView(view:any) {
      if (!view) return false;
      if (view?.prototype?.isReactComponent) return false;
      if ( typeof view === 'function' ) return true;
      return false;
  }
  