# Todo List Backend

# The Stack and Tools
1. Web server: [Node and Express](https://expressjs.com/)
2. Production cloud service: [Heroku](https://www.heroku.com/)
3. Production Command-Line Interface tool: [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

# Setup and Installation
```bash
    git clone https://github.com/EduarddoEscobar/todo-list-be.git
    cd todo-list-be
    npm i
    npm run start
```

# Endpoints

## Auth

| Method | Route              | Input              | Output                        |
|:-------|:-------------------|:-------------------|:------------------------------|
| [POST] | /api/auth/register | username, password | The new generated user object |
| [POST] | /api/auth/login    | username, password | Welcome ${username}           |
| [GET]  | /api/auth/logout   |                    | Logged out                    |
***

## Todos
| Method   | Route          | Input                        | Output                       |
|:---------|:---------------|:-----------------------------|:-----------------------------|
| [GET]    | /api/todos     |                              | All todos                    |
| [GET]    | /api/todos/:id |                              | The todo at the specified id |
| [POST]   | /api/todos     | todo_title, todo_description | The newly created todo       |
| [PUT]    | /api/todos/:id | todo_title, todo_description | The updated todo             |
| [DELETE] | /api/todos/:id |                              | The deleted todo             |
***

## Users
| Method   | Route                 | Input              | Output                                                         |
|:---------|:----------------------|:-------------------|:---------------------------------------------------------------|
| [GET]    | /api/users            |                    | All users                                                      |
| [GET]    | /api/users/self       |                    | The user that is signed in                                     |
| [GET]    | /api/users/self/todos |                    | The todos that belong to the user that is signed in            |
| [PUT]    | /api/users/self       | username, password | The updated user                                               |
| [DELETE] | /api/users/self       |                    | Message: Account was successfully deleted<br/>The deleted user |

# Deployment

Check out the deployed version [here](https://backend-for-todo-list.herokuapp.com/)!