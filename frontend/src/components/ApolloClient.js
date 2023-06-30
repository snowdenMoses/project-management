import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';



const cache = new InMemoryCache({
    typePolicies:{
        Query:{
            fields:{
                clients:{
                    merge(existing, incoming){
                        return incoming
                    }
                },
                projects:{
                    merge(existing, incoming){
                        return incoming
                    }
                }
            }
        }
    }
})
const jwtToken = localStorage.getItem('jwtToken');
const httpLink = createUploadLink({
    // uri: "http://localhost:80/api/",
    uri: "http://localhost:4000",
    headers: {
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    }
});

const client = new ApolloClient({
    link: httpLink,
    cache: cache,
});

export default client

