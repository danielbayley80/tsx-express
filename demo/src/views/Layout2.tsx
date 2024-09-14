import React, { ReactElement } from 'react'

import { ILayoutProps } from 'tsx-express'

import Header from './Header'

export default function MyLayout1({ children, locals }: ILayoutProps): ReactElement {

      return (
            <html lang="en" data-theme="dark">
                  <head>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link rel="stylesheet" href="/styles.css" />
                        <script src="https://unpkg.com/htmx.org@2.0.2" integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ" crossOrigin="anonymous"></script>
                        <title>{locals?.title}</title>
                  </head>
                  <body className="w-full  h-full  items-center justify-center " hx-headers='{"Accept" : "text/html"}'>

                        <Header title="Main layout two" color='bg-blue-700' />

                         <div className='max-w-sm mx-auto bg-base-200'>
                              <h1 className='my-4 text-xl'>This is layout two</h1>
                              {children}
                        </div>

                  </body>
            </html>
      )
}


