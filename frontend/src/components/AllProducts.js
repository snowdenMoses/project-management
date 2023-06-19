import { Button } from '@mui/material';
import { useContext } from 'react';
import ContextApi from './contextApi';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AllProducts() {
    const [_, __, ___, productsLoading, productsError, productsData] = useContext(ContextApi)
    React.useEffect(() => {

    }, [productsData])
    if (productsLoading) return <p>Loading...</p>;
    if (productsError) return <p>Error</p>;

   
    return (
                <Box sx={{ flexGrow: 2 }}>
                    <Button href="/sign-in">Login</Button>
                <Grid container spacing={2} >
                {
                    productsData.products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} >
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h8" component="div">
                                            Price:{product.price}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </Grid>
                    ))
                }
                </Grid>
                </Box>
                
    );
}
