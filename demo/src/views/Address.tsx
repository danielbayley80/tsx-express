import React, { ReactElement} from 'react'
import { IViewProps } from 'tsx-express';


export interface AddressViewProps {
      address1?: string;
      address2?: string;
      address3?: string;
      postalCode?: string;
}


export default function View({ address1, address2, address3, postalCode }: AddressViewProps ): ReactElement {

      return (
            <form className="w-full" id="form">
                  <div className="mb-5">
                        <label htmlFor="address1" className="block mb-2 text-sm font-medium text-gray-900 w-64">Address 1</label>
                        <input type="text" id="address1" placeholder=""   defaultValue={address1}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                />
                  </div>
                  <div className="mb-5">
                        <label htmlFor="address2" className="block mb-2 text-sm font-medium text-gray-900 w-64">Address 2</label>
                        <input type="text" id="address2" placeholder="" defaultValue={address2}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                               />
                  </div>
                  <div className="mb-5">
                        <label htmlFor="address3" className="block mb-2 text-sm font-medium text-gray-900 w-64">Address 3</label>
                        <input type="text" id="address3" placeholder="" defaultValue={address3}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                               />
                  </div>
                  <div className="mb-5">
                        <label htmlFor="postalcode" className="block mb-2 text-sm font-medium text-gray-900 w-64">Postal code</label>
                        <input type="text" id="address3" placeholder="" defaultValue={postalCode}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                               />
                  </div>
                  <button type="submit" hx-get="/address"  hx-swap="outerHTML" hx-target="#form"
                         className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Get address</button>
            </form>
      )
}
