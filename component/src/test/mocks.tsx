

const MockLayoutGlobal =
 ({ children }: any) => { return React.createElement('body', { id: 'GLOBAL' }, children); };
 

import React, { ReactElement } from 'react'
import { IViewProps } from 'src/ReactViews';

declare global {
      namespace Express {
          interface Locals {
              message: string;
          }
      }
  }

export const mockProps = { name: "Daniel" }

export function HelloWorld(): ReactElement {
      return (<div>Hello World</div>)
}


export function Layout1({children} : any): ReactElement {
      return (<div className="custom">{children}</div>)
}

export function LayoutGlobal({children} : any): ReactElement {
      return (<body>{children}</body>)
}



export function ViewLocals({locals} : IViewProps ): ReactElement {

      return (<div>{locals.message}</div>)
}

export interface Props {
      name: string
}
export function ViewProps({name} : Props ): ReactElement {
      return (<div>Hello {name}</div>)
}

export function ViewError({name} : Props ): ReactElement {
      throw new Error("Error rendering test view");
}
