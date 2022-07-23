import { getUsers } from "./openAPIs/users.swagger";

export const swaggerDocument = {
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Local server'
        }
    ],
    tags: [
        {
            name: 'Users'
        }
    ],
    paths: {
        "/users" : {
            "get" : getUsers
        }
    }
}