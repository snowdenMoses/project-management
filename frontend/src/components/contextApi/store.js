import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import ContextApi from './index'
function Store({ children }) {
    // const [clientsLoading, setclientsLoading] = useState()
    // const [clientsError, setclientsError] = useState()
    // const [clientsData, setclientsData] = useState([])
    // const [currentclientLoading, setCurrentclientLoading] = useState()
    // const [currentclientError, setCurrentclientError] = useState()
    // const [currentclientData, setCurrentclientData] = useState([])

    // function GetAllclients(){
    const GET_CLIENTS = gql`
            query {
                clients {
                created_at
                last_name
                first_name
                email
                password
                id
                }
            }
        `;
    const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS)
    const clientsDetailsArray = [clientsLoading, clientsError, clientsData]

    const GET_PROJECTS = gql`
            query {
                projects {
                name
                description
                duration
                client{
                    first_name
                    last_name
                }
                }
            }
        `;
    const { loading: projectsLoading, error: projectsError, data: projectsData } = useQuery(GET_PROJECTS)
    const projectsDetailsArray = [projectsLoading, projectsError, projectsData]


    const CURRENT_CLIENT = gql`
            query {
            currentClient {
                first_name
                email
                id
            }
            }
        `;
    const { loading: currentClientLoading, error: currentClientError, data: currentClientData } = useQuery(CURRENT_CLIENT)
    const currentClientDetailsArray = [currentClientLoading, currentClientError, currentClientData]


    return (
        <ContextApi.Provider value={[...currentClientDetailsArray, ...projectsDetailsArray, ...clientsDetailsArray]}>
            {children}
        </ContextApi.Provider>
    )
}
export default Store