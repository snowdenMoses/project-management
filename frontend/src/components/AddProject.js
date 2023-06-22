import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomizedSnackbars from './CustomizedSnackbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ContextApi from './contextApi';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { gql, useQuery } from '@apollo/client';
import client from './ApolloClient';
import { useMutation } from '@apollo/react-hooks'






const Addproject = () => {
    const [project_name, setproject_Name] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [imageFile, setImageFile] = useState("")
    const [imageData, setImageData] = useState(null)
    const [categories, setCategories] = useState([])
    const [categoriesUpload, setCategoriesUpload] = useState([])
    const [flashMessageState, setFlashMessageState] = useState()
    const [flashMessage, setFlashMessage] = useState(null)
    const header = "Add A project"
    const action = "Add project"

    const [_, __, currentclientData, ___, ____, projectsData, categoriesLoading, _________, categoriesData] = useContext(ContextApi)
    const categoriesTypes = categoriesData?.categories
    const client_id = currentclientData?.currentclient?.id
    const Create_project = gql`
        mutation Newproject($client_id: String ,$project_name: String, $description: String, $price: Int, $imageFile: String, $categories: [String]!){
        createproject(client_id: $client_id, data: {
            name: $project_name,
            description: $description,
            price: $price,
            imageFile: $imageFile,
            categories: $categories
        }){
            name
        }
    }
     `
    // const [createproject, { loading, error }] = useMutation(Create_project);
    const [createproject, { data }] = useMutation(Create_project);
    const history = useHistory()
    const theme = createTheme();

    const convertFileToJSON = (file) => {

        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target.result;
                resolve(
                    setImageData(dataURL)
                )
            };
            reader.readAsDataURL(file);
        })



    };
    const handleFileInput = async (event) => {
        const file = event.target.files[0]
        const fData = new FormData()
        fData.append("file", file)
        fData.forEach(eachData => {
            setImageFile(eachData);
            console.log("fData", eachData)
        })

    };
    const handleCategoryChange = (e) => {
        const catValue = e.target.value
        const CBchecked = e.target.checked
        if (CBchecked) {
            setCategoriesUpload([...categoriesUpload, catValue])
        }
        else if (!CBchecked) {
            setCategoriesUpload(categoriesUpload.filter(cat => cat !== catValue))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (imageFile) {
                createproject({ variables: { client_id, project_name, description, price, imageFile, categories: categoriesUpload } })
                    .then((response) => {
                        setFlashMessage(response.data.message)
                        setFlashMessageState('success')
                        setTimeout(() => {
                            setFlashMessageState('')
                            // history.push("/client-dashboard")
                        }, 4000)
                        history.push("/")
                        setproject_Name("")
                        setDescription("")
                        setPrice("")

                    })

            } else return alert("Not Present")
        }
        catch (error) {
            // const errors = error.response.data.data
            // for (error in errors) {
            //     setFlashMessage(error + " " + errors[error][0])
            //     setFlashMessageState('error')
            //     setTimeout(() => {
            //         setFlashMessageState('')
            //     }, 4000)
            // }
        }

    }

    useEffect(() => {

    })
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
                                id="project_name"
                                label="project Name"
                                name="project_name"
                                autoComplete="project Name"
                                autoFocus
                                value={project_name}
                                onChange={(e) => setproject_Name(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                name="price"
                                autoComplete="price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                            <Input
                                accept="image/*"
                                fullWidth
                                multiple
                                type="file"
                                margin="normal"
                                required
                                id="file"
                                onChange={(e) => { handleFileInput(e) }}
                            />
                            <FormGroup row>
                                {categoriesLoading ? <p>Loading....</p> :
                                    categoriesTypes?.map((category) => {
                                        return (
                                            <FormControlLabel
                                                value={category.id}
                                                control={<Checkbox
                                                    onChange={(e) => {
                                                        handleCategoryChange(e);
                                                    }} />}
                                                label={category.name} />
                                        )
                                    })}
                            </FormGroup>
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
export default Addproject
