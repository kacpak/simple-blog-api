# Blog backend
This is a demo backend application that provides simple CRUD API to use during teaching frontend principles

## How to use
1. Clone the repository
2. `cd` to cloned repository
3. Run `yarn` to install dependencies
4. Run `yarn build` to build the application
5. Run `yarn start` to start the server
6. API should be available under localhost:3001
7. Remember to adjust proxy configuration of your frontend dev server tool to map to this backend

## Routes
All routes accept json payload only, remember to set correct Content-Type header. 

### Auth
| Routes           | HTTP   | Request JSON Payload                                                                          | Response                                                                                       | Description                                  |
|------------------|--------|-----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|----------------------------------------------|
| /api/auth/signup | `POST` | <pre>{<br />    name: string;<br />    email: string;<br />    password: string;<br />}</pre> |                                                                                                | Route used to register a new user            | 
| /api/auth/login  | `POST` | <pre>{<br />    email: string;<br />    password: string;<br />}</pre>                        |                                                                                                | Logins the user initializing session         |
| /api/auth/logout | `POST` | ---                                                                                           |                                                                                                | Logs out current user                        |
| /api/auth/me     | `GET`  | ---                                                                                           | <pre>{<br />     id: string;<br />     email: string;<br />     password: string;<br />}</pre> | Returns current user or 403 if not logged in |

### Posts
To use this routes (other than `GET` ones) you need to be logged in. 

| Routes         | HTTP     | Request JSON Payload                                                                              | Response                                                                                                                                                                                                                                                                                                                 | Description                           |
|----------------|----------|---------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| /api/posts     | `GET`    | ---                                                                                               | Array of posts                                                                                                                                                                                                                                                                                                           | Returns all posts                     | 
| /api/posts/:id | `GET`    | ---                                                                                               | <pre>{<br />    id: number;<br />    createdAt: string;<br />    updatedAt: string;<br />    title: string;<br />    content: string;<br />    published: boolean;<br />    authorId: number;<br />    author: {<br />        id: number;<br />        name: string;<br />        email: string;<br />    }<br />}</pre> | Returns a post of id passed in url    |
| /api/posts/    | `POST`   | <pre>{<br/>    title: string;<br/>    content: string;<br/>    published?: boolean;<br/>}</pre>   |                                                                                                                                                                                                                                                                                                                          | Adds new post                         |
| /api/posts/:id | `PUT`    | <pre>{<br/>    title?: string;<br/>    content?: string;<br/>    published?: boolean;<br/>}</pre> |                                                                                                                                                                                                                                                                                                                          | Modifies the post of id passed in url |
| /api/posts/:id | `DELETE` |                                                                                                   |                                                                                                                                                                                                                                                                                                                          | Deletes the post of id passed in url  |


