import React from "react";
import { ReactGlobalOptions, ReactResponseOptions, getHtml, initializeReactRenderer } from "../ReactViews";
import { HelloWorld, Layout1, LayoutGlobal, mockProps, ViewError, ViewLocals, ViewProps } from "./mocks";

describe('getHtml', () => {



      // Test with a simple component and props
      test('render HTML for a simple component, no props', () => {
            const html = getHtml(HelloWorld);
            expect(html).toContain('<div>Hello World</div>');
      });


      test('render HTML for a simple component, no props', () => {
            const props: any = { locals: {} };
            props.locals.message = "Hey"
            const html = getHtml(ViewLocals, props);
            expect(html).toContain('<div>Hey</div>');
      });

      test('render simple view with props supplied', () => {
            const html = getHtml(ViewProps, mockProps);
            expect(html).toContain('<div>Hello Daniel</div>');
      });

      test('render view that expects props but no props provided', () => {
            const html = getHtml(ViewProps);
            expect(html).toContain('<div>Hello </div>');
      });

      test('renders a view using a global layout', () => {
            const globalOptions: ReactGlobalOptions = { defaultLayout: LayoutGlobal }
            const html = getHtml(HelloWorld, undefined, globalOptions);
            expect(html).toContain('<body><div>Hello World</div></body>');
      });

      test('renders a view using a response layout', () => {
            const responseOptions: ReactResponseOptions = { layout: Layout1 }
            const html = getHtml(ViewProps, mockProps, undefined, responseOptions);
            expect(html).toContain('<div class="custom"><div>Hello Daniel</div></div>');
      });

      test('render view, overiding global layout with response layout', () => {
            const responseOptions: ReactResponseOptions = { layout: Layout1 }
            const globalOptions: ReactGlobalOptions = { defaultLayout: LayoutGlobal }
            const html = getHtml(ViewProps, mockProps, globalOptions, responseOptions);
            expect(html).toContain('<div class="custom"><div>Hello Daniel</div></div>');
      });

      test('render view removing the layout using noLayout', () => {
            const responseOptions: ReactResponseOptions = { layout: "noLayout" }
            const globalOptions: ReactGlobalOptions = { defaultLayout: LayoutGlobal }
            const html = getHtml(ViewProps, mockProps, globalOptions, responseOptions);
            expect(html).toContain('<div>Hello Daniel</div>');
      })

      test('renders HTML without layout specified', () => {
            const globalOptions: ReactGlobalOptions = {};
            const responseOptions: ReactResponseOptions = {}
            const html = getHtml(ViewProps, mockProps, globalOptions, responseOptions);
            expect(html).toContain('<div>Hello Daniel</div>');
      });

      test('render error for an invalid view', () => {
            const responseOptions: ReactResponseOptions = { layout: Layout1 }
            const globalOptions: ReactGlobalOptions = { defaultLayout: LayoutGlobal }
            const html = getHtml({} as any, mockProps, globalOptions, responseOptions);
            expect(html).toContain('<!-- Invalid view -->');
      });

      test('render error for invalid default layout', () => {
            const globalOptions = { defaultLayout: "invalid value" };
            const html = getHtml(HelloWorld, undefined, globalOptions as any);
            expect(html).toContain('<!-- Invalid layout -->');
      })

      test('render error for invalid response layout', () => {
            const responseOptions = { layout: "invalid value" }
            const html = getHtml(HelloWorld, undefined, undefined, responseOptions as any);
            expect(html).toContain('<!-- Invalid layout -->');
      });


      test('render error for error thrown in view', () => {
            const responseOptions: ReactResponseOptions = { layout: Layout1 }
            const globalOptions: ReactGlobalOptions = { defaultLayout: LayoutGlobal }
            const html = getHtml(ViewError, mockProps, globalOptions, responseOptions);
            expect(html).toContain('<!-- Rendering error -->');
      });

});
