import { Button } from '@mui/material';
import { useContext, useState } from 'react';
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
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import AddProjectModal from './Modal/AddProjectModal';
import ProjectDetailsModal from './Modal/ProjectDetailsModal';
import AddClientModal from './Modal/AddClientModal';
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function HomePage() {
    const [ individualProjectData, setIndividualProjectData] = useState()
    const [open, setOpen] = useState(false);
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [createClientModalState, setCreateClientModalState] = useState(false);
    const [createProjectModalState, setCreateProjectModalState] = useState(false);
    const handleCreateClientModalClose = () => setCreateClientModalState(false);
    const handleCreateProjectModalClose = () => setCreateProjectModalState(false);
    const handleClose = () => setOpen(false);
    const [_, __, ___, projectsLoading, projectsError, projectsData] = useContext(ContextApi)
    React.useEffect(() => {

    }, [projectsData])
    if (projectsLoading) return <p>Loading...</p>;
    if (projectsError) return <p>Error</p>;


    return (
        <Box sx={{ flexGrow: 2 }}>
            { open ? <ProjectDetailsModal individualProjectData = { individualProjectData }
             open={open} 
             handleClose={handleClose}/>
            : "" }
            <div className='titleContainer'>
                <div className='title'>
                    <HourglassDisabledIcon />
                    <span className="mainTitle">
                        Project Management
                    </span>
                </div>
                <div className="createButton"> 
                    <div className="createClientButton">
                        <Button variant="contained" onClick={() => setCreateClientModalState(true)}>
                            <PersonAddIcon /> Add Client
                        </Button>
                    </div>
                    <div className="createProjectButton">
                        <Button variant="contained" onClick={() => setCreateProjectModalState(true)} >
                            <ArticleIcon /> New Project
                        </Button>
                    </div>
                </div>
                <div className="createButton"> 
                    <AddClientModal className='addClientModal' 
                    open = { createClientModalState } 
                    handleClose = { handleCreateClientModalClose }
                    />
                    <AddProjectModal className="createProjectButton"
                    open = { createProjectModalState } 
                    handleClose = { handleCreateProjectModalClose }
                    individualProjectData = { individualProjectData }
                    editButtonClicked = {editButtonClicked}
                    setIndividualProjectData = {setIndividualProjectData}
                    />
                </div>
                
            </div>
            <Grid container spacing={2} >
                {
                    projectsData.projects.map((project) => {
                        const from = moment(new Date(Number(project.created_at))).format("MMMM Do YYYY")
                        const to = moment(new Date(Number(project.created_at))).add(project.duration, 'd')
                        const projectManager = `${project.client.first_name} ${project.client.last_name}`
                        const isPassedDeadline =  moment.utc(new Date()).valueOf() > to
                        return (
                        <Grid item xs={12} sm={6} md={4} >
                            <Card sx={{ height: '100%' }} className='projectCard'>
                                <EditIcon className='editProjectButton' 
                                onClick={() => {
                                    setCreateProjectModalState(true)
                                    setEditButtonClicked(true)
                                    setIndividualProjectData({
                                        id: project.id,
                                        name: project.name,
                                        description: project.description,
                                        status: project.status,
                                        duration: project.duration,
                                        projectManager, 
                                        from,
                                        to,
                                        client_id: project.client.id,
                                        client_first_name: project.client.first_name,
                                    })
                                }}
                                />
                                <CardActionArea onClick={ ()=>{
                                setIndividualProjectData({
                                    id: project.id,
                                    name: project.name,
                                    description: project.description,
                                    status: project.status,
                                    duration: project.duration,
                                    projectManager, 
                                    from,
                                    to
                                })
                                setOpen(true)
                        }
                        }>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {project.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component="div">
                                            Status: {project.status}
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component="div">
                                            Project Manager: { projectManager }
                                        </Typography>
                                        <Typography 
                                        gutterBottom variant="h8" 
                                        component="div" 
                                        className={isPassedDeadline && project.status != "DONE" ? "projectDuration" : ""}>
                                            Duration: { from } - { to.format("MMMM Do YYYY") } ({project.duration} days)
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component="div">
                                            
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })
                }
            </Grid>
        </Box>

    );
}
