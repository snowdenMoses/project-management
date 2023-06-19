// import { useQuery, gql } from '@apollo/client';
import { Button } from '@mui/material';
import { useContext } from 'react';
import ContextApi from './contextApi';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function Vendors(){
  const [_,__,___,____,_____,______,vendorsLoading, vendorsError, vendorsData] = useContext(ContextApi)
  if (vendorsLoading) return <p>Loading...</p>;
  if (vendorsError) return <p>Error</p>;

  return (
    <>
      {
        vendorsData.vendors.map((vendor) => (
          <>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {vendor.first_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
       </>
      ))
    }
      
    </>

   
  );
}