"use client"
import React, {useState, useEffect, useCallback} from 'react'

import FilterArea from '@/components/FilterArea'
import Select from 'react-select'
import ProductCard from '@/components/ProductCard'

import NoResult from '@/components/NoResult'
import api from '@/api/api'

import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton'


const Category = ({params, searchParams}) => {
  const categoryParam = params.product;
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async()=>{
    const response = await api.get(`products/${categoryParam}`);
    setProducts(response.data);
    setTimeout(()=>{
      setLoading(false);
    },1500)
  },[categoryParam]);

  const fetchFilters = useCallback(async()=>{
    const res = await api.get(`filters/${categoryParam}`);
    const data = res.data;
    if(data.status){
      setFilters(data || []);
    }
  },[categoryParam])

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  // useEffect(() => {
  //   fetchFilters();
  // }, [fetchFilters])

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = 'transparent';
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : 'grey',
        color: '#FFF',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };
  return (
    <main className='le_archive-page py-5'>
      <div className="relative grid grid-cols-1 lg:grid-cols-5 ">
        <div className="relative pl-5">
          <FilterArea />
        </div>
        <div className="relative lg:col-span-4 px-5">
          <div className="archive-pr-wrapper">
            <h3 className='searched-text'>Eyeglasses</h3>
            <div className="flt-ot-bar flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-3 flex-wrap">
                <Select options={options} styles={colourStyles} />
                <Select options={options} styles={colourStyles} />
                <Select options={options} styles={colourStyles} />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Select options={options} styles={colourStyles} />
              </div>
            </div>
            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">
              {
                loading ?
                [...Array(6)].map((item, index)=>(
                  <ProductCardSkeleton key={index} />
                )):
                products.length? products.map((item,index)=>{
                  return(
                    <div className="relative" key={index}>
                      <ProductCard data={item} />
                    </div>
                  )
                }):<NoResult />
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Category