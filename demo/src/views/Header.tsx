import React, { ReactElement } from 'react'


export interface HeaderViewProps {
      title: string;
      color: string;

}


export default function View({ title, color }: HeaderViewProps): ReactElement {

      const css: string = `${color} w-full mb-4 p-4`

      return (
            <>
                  <header className={css}>
                        <div className='max-w-sm mx-auto bg-base-200 text-white text-xl'>
                              TSX-EXPRESS DEMO
                        </div>
                  </header>


            </>
      )
}
