import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomizedSnackbars from './CustomizedSnackbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import ContextApi from './contextApi';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { gql, useMutation, useQuery } from '@apollo/client';


const AddCategory = () => {
    const [category_name, setCategory_Name] = useState("")
    const [flashMessageState, setFlashMessageState] = useState()
    const [flashMessage, setFlashMessage] = useState(null)
    const header = "Add A Category"
    const action = "Add Category"

    const [_, __, currentVendorData] = useContext(ContextApi)
    const vendor_id = currentVendorData?.currentVendor?.id
    const Create_Category = gql`
        mutation NewCategory($category_name: String){
        createCategory(data: {
            name: $category_name
        }) {
            category {
                name
                }
            message
        }
    }
     `
    const [createCategory, { loading, error }] = useMutation(Create_Category);
    const theme = createTheme();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            createCategory({ variables: { category_name } })
                .then((response) => {
                    console.log("cat_response", response)
                    setFlashMessage(response.data.createCategory.message)
                    setFlashMessageState('success')
                    setTimeout(() => {
                        setFlashMessageState('')
                        // history.push("/vendor-dashboard")
                    }, 4000)
                    setCategory_Name("")
                })
        }
        catch (error) {
            const errors = error.response.data.data
            for (error in errors) {
                setFlashMessage(error + " " + errors[error][0])
                setFlashMessageState('error')
                setTimeout(() => {
                    setFlashMessageState('')
                }, 4000)
            }
        }

    }
    return (
        <>
            {flashMessageState && flashMessage !== null ?
                <div className='flash_message'>
                    <CustomizedSnackbars severity={flashMessageState} message={flashMessage} />
                </div>
                : ""}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <AddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {header}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="category_name"
                                label="Category Name"
                                name="category_name"
                                autoComplete="Category Name"
                                autoFocus
                                value={category_name}
                                onChange={(e) => setCategory_Name(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {action}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )
}
export default AddCategory
