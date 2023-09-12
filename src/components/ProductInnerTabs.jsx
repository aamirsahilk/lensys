import React from 'react'

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
   

const ProductInnerTabs = ({data}) => {
    const {product_name, product_price, regular_price, currency, product_description, attributes} = data;
    console.log('atttr', attributes);
  return (
    <>
        <Tabs value={'desc'}>
            <TabsHeader className='le_tabs-header'>
    
                <Tab value="desc">
                Description
                </Tab>
                <Tab value="det">
                Details
                </Tab>
                {/* <Tab value="ship">
                Shipping
                </Tab> */}
          
            </TabsHeader>
            <TabsBody className='mt-8'>
          
              <TabPanel value="desc">
                {product_description || 'No Description'}
              </TabPanel>
              <TabPanel value="det">
                {
                  attributes &&
                  <div className="max-w-[600px] mx-auto">
                    <table className='c-table'>
                      <tbody>
                        {
                          attributes?.map((at, index)=>(
                            <tr key={index}>
                              <td>{at.key}</td>
                              <td>{at.value}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                }
              </TabPanel>
              <TabPanel value="ship">
                {
                  "No Shipping details"
                }
              </TabPanel>
           
            </TabsBody>
        </Tabs>
    </>
  )
}

export default ProductInnerTabs