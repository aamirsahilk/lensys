import React from 'react'

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
   

const ProductInnerTabs = () => {
    const data = [
        {
          label: "Description",
          value: "desc",
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
        },
        {
          label: "Details",
          value: "det",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
          label: "Shipping",
          value: "ship",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        }
      ];
  return (
    <>
        <Tabs value={data[0].value}>
            <TabsHeader className='le_tabs-header'>
            {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                {label}
                </Tab>
            ))}
            </TabsHeader>
            <TabsBody className='mt-8'>
            {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                {desc}
                </TabPanel>
            ))}
            </TabsBody>
        </Tabs>
    </>
  )
}

export default ProductInnerTabs