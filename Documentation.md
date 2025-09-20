# Documentation

Here is a straight-forward documentation for using Todo-List-API

## Response format

Every response from this API is a JSON object with three properties:

- success (boolean)
- message (string)
- data (object)

The only exception is when the status code is `204` and there is no response
body.

### Success

This is a boolean indicating whether the request was OK or not. If the API
successfully understands the request and responds with the information you want,
the value of `success` will be `true`, anything else will make this property to
be `false`.  
Based on the different status codes that Todo-List-API may use in the response
of your request, `true` is for when the status code is `200`, `201` or `204` and
`false` is for when it's anything else.

### Message

`message` is a short string explaining a summary of the response object. Its
value is based on the status codes and `data`.

### Data

This is the property containing the actual data that a user wants. `data` will
be an empty object if an error occurs.

Here is an example of a response object:

1. Request: `GET /todos/12`
2. Response:
   ```json
   {
     "success": true,
     "message": "Got todo item",
     "data": {
       "todo_id": 12,
       "user_id": 3,
       "title": "Do homework",
       "description": "Solve differential equation, deadline is Friday.",
       "created_at": "2025-10-15T18:16:34.509Z",
       "updated_at": "2025-10-17T23:02:40.961Z"
     }
   }
   ```

## Authorization

After a successful login or registration, a JWT will be sent to the client:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "header.payload.signature"
  }
}
```

This JWT must be used for any request that accesses protected resources. The API
expects the token to be present in the `Authorization` header of the request.
The token must be after the `Bearer` keyword, though this keyword itself is not
checked, it is required for the token to be the 2nd part of the header:  
`Authorization: Bearer header.payload.signature`

If a request to the protected resources does not contain a valid token, a `401`
error will be sent back.  
Protected resources (all http methods):

- `/todos`
- `/todos/:todoId`

## Endpoints

- `POST` -> `/register`  
  Register a new user with the specified information in the example. The email
  must be unique. The response will contain a JWT if successful. Possible status
  codes are `201`, `409` and `400`. Request body example:

  ```json
  {
    "name": "John Doe",
    "email": "john@doe.com",
    "password": "VerySecure123!"
  }
  ```

  The password must have at least one lowercase letter, one uppercase letter,
  one digit and one special character. Password's minimum length is 8.

- `POST` -> `/login`  
  Log in and recieve a JWT. Possible status codes are `200`, `401` and `400`.
  Request body is similar to `/register` endpoint but the `name` property is not
  required.

- `POST` -> `/todos`  
  A todo item will be created and the content of the newly created item will be
  returned in the response body. Possible status codes are `201`, `401` and
  `400`.

- `PUT` -> `/todos/:todoId`  
  The todo item with an ID of `:todoId` will be updated based on the request
  body provided. The request body must be a json object with `title` and
  `description` properties. The response contains the updated todo item.
  Possible status codes are `200`, `400`, `401`, `403` and `404`.

- `DELETE` -> `/todos/:todoId`  
  Delete the todo item with an ID of `:todoId`. Possible status codes are `204`,
  `400`, `401`, `403` and `404`. Response body will be empty if the status code
  is `204`.

The API uses rate limiter. This means that at each point if you reach your
request limit, a `429` error will be sent back. So all the endpoints may also
return `429` status code aside from what was explained.
