import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import ContextApi from './index'
function Store({ children }) {
    // const [vendorsLoading, setVendorsLoading] = useState()
    // const [vendorsError, setVendorsError] = useState()
    // const [vendorsData, setVendorsData] = useState([])
    // const [currentVendorLoading, setCurrentVendorLoading] = useState()
    // const [currentVendorError, setCurrentVendorError] = useState()
    // const [currentVendorData, setCurrentVendorData] = useState([])

// function GetAllVendors(){
    const GET_Vendors = gql`
            query {
                vendors {
                created_at
                last_name
                first_name
                email
                password
                id
                }
            }
        `;
    const { loading: vendorsLoading, error: vendorsError, data: vendorsData } = useQuery(GET_Vendors)
    const vendorsDetailsArray = [vendorsLoading, vendorsError, vendorsData]

    const GET_products = gql`
            query {
                products {
                name
                description
                price
                vendor{
                    first_name
                    last_name
                }
                }
            }
        `;
    const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_products)
    const productsDetailsArray = [productsLoading, productsError, productsData]


    const CURRENT_Vendor = gql`
            query {
            currentVendor {
                first_name
                email
                id
            }
            }
        `;
    const { loading: currentVendorLoading, error: currentVendorError, data: currentVendorData } = useQuery(CURRENT_Vendor)
    const currentVendorDetailsArray = [currentVendorLoading, currentVendorError, currentVendorData]
    
    const Get_Categories = gql`
            query {
            categories {
                name
                id
            }
            }
        `;
    const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(Get_Categories)
    const CategoriesDetailsArray = [categoriesLoading, categoriesError, categoriesData]

   
    return (
        <ContextApi.Provider value={[...currentVendorDetailsArray, ...productsDetailsArray, ...CategoriesDetailsArray, ...vendorsDetailsArray]}>
            {children}
        </ContextApi.Provider>
    )
}
export default Store