import { useQuery, gql } from '@apollo/client';
import { Button } from '@mui/base';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextApi from './contextApi';
import CustomizedSnackbars from './CustomizedSnackbar';

export default function VendorDashboard() {
  const history = useHistory()
  const location = useLocation()
  const vendor_id = location.state.vendor_id

  const handleLogOut = ()=>{
    
    localStorage.setItem("jwtToken",null)
    history.push("/")
  }

  const Get_Vendor = gql`
  query Vendor($vendor_id: String){
    vendor(id: $vendor_id) {
    first_name
    id
    }
  }
  `;

  const { loading, error, data } = useQuery(Get_Vendor, {variables: {
    vendor_id: vendor_id
  }})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <>
    <Button onClick={handleLogOut}>Log Out</Button>
    <div>
      <h1 key={data.vendor.id}> Welcome {data.vendor.first_name}</h1> 
    </div>
    </>
);
    
    
}
