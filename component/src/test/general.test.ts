
 

import express, { Express, Request, Response } from 'express';
import { initializeReactRenderer } from './../ReactViews';
import request from 'supertest';
import {HelloWorld, Layout1, ViewLocals} from './mocks'

describe('initializeReactRenderer', () => {
    let app: Express;

    beforeEach(() => {
        app = express();
        initializeReactRenderer(app);
        app.get('/', (req: Request, res: Response) => {
            res.renderReact(HelloWorld,null)

        });
    });

    it('should attach renderReact to the response object', async () => {
        await request(app)
            .get('/')
            .expect(200)
            .expect('<div>Hello World</div>');
    });
});



describe('renderReact', () => {
    let app: Express;

    beforeEach(() => {
        app = express();
        initializeReactRenderer(app);
    });

    it('should render a React component and send the HTML as response', async () => {
 
        app.get('/', (req: Request, res: Response) => {
            res.locals.message = 'Hello from locals';
            res.renderReact(ViewLocals);
        });

        await request(app)
            .get('/')
            .expect(200)
            .expect('<div>Hello from locals</div>');
    });

    it('should handle errors during rendering', async () => {
        const ErrorComponent: React.FC<any> = () => {
            throw new Error('Test Error');
        };

        app.get('/', (req: Request, res: Response) => {
            res.renderReact(ErrorComponent, {});
        });

        await request(app)
            .get('/')
            .expect(200)
            .expect('<!-- Rendering error -->');
    });
});


describe('renderReact with custom layout', () => {
      let app: Express;
  
      beforeEach(() => {
          app = express();
          initializeReactRenderer(app);
      });
  
      it('should render with a custom layout', async () => {

          app.get('/', (req: Request, res: Response) => {
              res.renderReact(HelloWorld, {}, { layout: Layout1 });
          });
  
          await request(app)
              .get('/')
              .expect(200)
              .expect('<div class="custom"><div>Hello World</div></div>');
      });
  });


  describe('setReactLayouts removing layout', () => {
      let app: Express;
  
      beforeEach(() => {
          app = express();
          initializeReactRenderer(app, {defaultLayout:Layout1});
      });
  
      it('should render without layout', async () => {

          app.get('/', (req: Request, res: Response) => {
               res.setReactLayouts("noLayout","noLayout")
               res.renderReact(HelloWorld, {} );
          });
  
          await request(app)
              .get('/')
              .expect(200)
              .expect('<div>Hello World</div>');
      });
  });