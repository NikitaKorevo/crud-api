# crud-api

##### Simple CRUD API using in-memory database underneath.

## Installing

```
$user: git clone {repository URL}
$user: cd crud-api
$user: npm run install
```

## Running

##### Development mode:

`$user: npm run start:dev`

##### Production mode:

`$user: npm run start:prod`

## Using

##### Base URL:

`http://localhost:3000/`

##### Endpoints:

| Endpoint             | HTTP Method | Result            |
| -------------------- | ----------- | ----------------- |
| `api/user`           | GET         | Get all users     |
| `api/user/${userId}` | GET         | Get single user   |
| `api/user`           | POST        | Create a new user |
| `api/user/{userId}`  | PUT         | Update a user     |
| `api/user/${userId}` | DELETE      | Delete a user     |

##### Example:

`http://localhost:3000/api/user`

## Scheme

##### User

```
{
  id: string;
  username: string;
  age: string;
  hobbies: Array<string>;
}
```
