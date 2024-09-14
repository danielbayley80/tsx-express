import React, { ReactElement } from 'react'

import { ILayoutProps } from 'tsx-express'


export default function LayoutChild({ children, locals }: ILayoutProps): ReactElement {

      return (
            <div className='bg-blue-200 p-2'>
                  <h2 className='my-4 text-lg'>This is a child layout</h2>
                  <div className=''>
                        {children}

                  </div>
            </div>
      )
}


