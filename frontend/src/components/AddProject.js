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
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks'
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';






const Addproject = ({handleClose, individualProjectData, editButtonClicked, setIndividualProjectData}) => {
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState()
    const [client, setClient] = useState("")
    const [status, setStatus] = useState("TODO")
    const [flashMessageState, setFlashMessageState] = useState()
    const [flashMessage, setFlashMessage] = useState(null)
    const header = editButtonClicked ? "Update Project" : "Add A Project"
    const action = editButtonClicked ? "Update Project" : "Add Project"
    useState(() => {
        if (editButtonClicked) {
          setDuration(individualProjectData.duration);
          setProjectName(individualProjectData.name);
          setDescription(individualProjectData.description);
        }
      }, [editButtonClicked]);

    console.log("individualProjectData", individualProjectData);

    const [_, __, currentclientData, ___, ____, projectsData, categoriesLoading, _________, categoriesData] = useContext(ContextApi)
    const client_id = currentclientData?.currentclient?.id
    const Create_project = gql`
        mutation Newproject($client_id: String ,$projectName: String, $description: String, $duration: Int, $status: String){
        createProject(client_id: $client_id, data: {
            name: $projectName,
            description: $description,
            duration: $duration,
            status: $status
        }){
            name
            id
        }
    }`

    const UPDATE_PROJECT = gql`
        mutation updateProject($project_id: String, $client_id: String ,$projectName: String, $description: String, $duration: Int, $status: String){
            updateProject(project_id: $project_id, data: {
            name: $projectName,
            description: $description,
            duration: $duration,
            status: $status
            client_id: $client_id
        }){
            name
            id
        }
    }
     `
    const GET_CLIENTS = gql`
        query {
        clients{
            id
            first_name
        }
    }
     `

    const { loading: clientLoading, error: clientError, data: clientData } = useQuery(GET_CLIENTS)
    const [createproject, { data }] = useMutation(Create_project);
    const [updateProject, { data: projectData }] = useMutation(UPDATE_PROJECT);
    const history = useHistory()
    const theme = createTheme();
   
    const handleClientChange = (e) => {
        setClient(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!editButtonClicked){
                createproject({ variables: { client_id: client, projectName, description, duration, status} })
                    .then((response) => {
                        setFlashMessage(response.data.message)
                        setFlashMessageState('success')
                        setTimeout(() => {
                            setFlashMessageState('')
                        }, 4000)
                        setProjectName("")
                        setDescription("")
                        setDuration("")
                        setStatus("")
                        setClient("")

                    })
                }
                else{
                    updateProject({ variables: { project_id: individualProjectData.id, client_id: client, projectName, description, duration, status} })
                        .then((response) => {
                            setFlashMessage(response.data.message)
                            setFlashMessageState('success')
                            setTimeout(() => {
                                setFlashMessageState('')
                            }, 4000)
                            setProjectName("")
                            setDescription("")
                            setDuration("")
                            setStatus("")
                            setClient("")
    
                        })
                    }
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
    console.log("individualProjectData", individualProjectData?.client_first_name);
    console.log("projectData", projectData);
    return (
        <>
            {flashMessageState && flashMessage !== null ?
                <div className='flash_message'>
                    <CustomizedSnackbars severity={flashMessageState} message={flashMessage} />
                </div>
                : ""}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CloseIcon className='closeModal' onClick={handleClose}/>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
                            <AddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {header}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="projectName"
                                label="Project Name"
                                name="projectName"
                                autoComplete="Project Name"
                                value={projectName}
                                onChange={(e) => { 
                                    // setIndividualProjectData(false)
                                    setProjectName(e.target.value)
                                }}
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                value={description}
                                onChange={(e) => {
                                    // setIndividualProjectData(false)
                                    setDescription(e.target.value)
                                }}
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="duration"
                                label="Duration"
                                name="duration"
                                autoComplete="duration"
                                value={duration}
                                onChange={(e) => {
                                    // setIndividualProjectData(false)
                                    setDuration(Number(e.target.value))

                                
                                }}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="select-label">Client</InputLabel>
                                <Select
                                    margin="normal"
                                    labelId="select-label"
                                    id="select"
                                    label="Client"
                                    onChange={(e)=> handleClientChange(e)}
                                    required
                                >
                                {clientData.clients.map(client=> <MenuItem value={client.id}> {client.first_name} </MenuItem>) }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="select-label">Status</InputLabel>
                                <Select
                                    
                                    labelId="select-label"
                                    id="select"
                                    label="Status"
                                    onChange={(e)=> setStatus(e.target.value)}
                                    required
                                >
                                <MenuItem value="TODO"> TODO </MenuItem>
                                <MenuItem value="INPROGRESS"> IN PROGRESS </MenuItem>
                                <MenuItem value="DONE"> DONE </MenuItem>
                                </Select>
                            </FormControl>

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
