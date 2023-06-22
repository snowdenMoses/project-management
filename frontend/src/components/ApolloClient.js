import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';


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
    cache: new InMemoryCache(),
});

export default client

