# API Documentation

API documentation for Admin Panel to Login and CRUD Problem statements

### Server URL : ```http://localhost:8000/``` 

## Admin Auth Endpoints:

### 1. Admin Login

**Endpoint:** `POST /api/user/login`

```http
POST /api/user/login HTTP/1.1
Host: localhost:8000
Content-Type: application/x-www-form-urlencoded
Content-Length: 52

{
    "email": "sbjai21is@cmrit.ac.in",
    "password": "123456"
}
```
**Description:** Authenticates an admin user and returns a JWT token if successful.

**Response:** Upon successful login, a JWT token will be returned, which should be used in the "Authorization: Bearer ``<token>``" header for protected endpoints.


## Problem Statements Endpoints:

### 1. Add Problem Statement

**POST** ``/api/problem/add``

```http
POST /api/problem/add HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Content-Length: 280

{
    "problemStatement": "Example problem statement 8",
    "toughnessLevel": "hacker",
    "templateCodePy": "Python code template",
    "templateCodeJava": "Java code template",
    "templateCodeCpp": "C++ code template",
    "driverCodePy": "Python driver code",
    "driverCodeJava": "Java driver code",
    "driverCodeCpp": "C++ driver code"
}
```

**Description:** Adds a new problem statement with associated template and driver code for Python, Java, and C++.

**Response:** ``201`` Created on success.


### 2. Get All Problems
**GET** ``/api/problem/all``

```http
GET /api/problem/all HTTP/1.1
Host: localhost:8000
```

**Description:** Retrieves all problem statements.

**Response:** List of all problems with details.


### 3. Update Problem

**PUT** ```/api/problem/update/{problemId}```

```http
PUT /api/problem/update/66e66d04-5e7e-4e83-9d1d-bca0e893035b HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Content-Length: 60

{
    "problemStatement": "Updated problem statement"
}
```
**Description:** Updates an existing problem statement using its ID.

**Request Parameters:** problemId (string) - ID of the problem to be updated.

**Response:** `200` OK on success.


### 4. Delete Problem

**DELETE** ``/api/problem/delete/{problemId}``

```http
DELETE /api/problem/delete/66e66d04-5e7e-4e83-9d1d-bca0e893035b HTTP/1.1
Host: localhost:8000
```
**Description:** Deletes a problem statement by ID.

**Request Parameters:** problemId (string) - ID of the problem to be deleted.

**Response:** `204` No Content on successful deletion.


### 5. Get Problem by ID

**GET** ``/api/problem/{problemId}``

```http
\GET /api/problem/de106cfe-f922-4029-b6fb-abfe22f6b354 HTTP/1.1
Host: localhost:8000
```
**Description:** Retrieves a specific problem by its ID.

**Request Parameters:** problemId (string) - ID of the problem to retrieve.

**Response:** Problem details in `JSON` format.


### 6. Get Problems by Category

***GET** ``/api/problem/all/{category}``

```http
GET /api/problem/all/hacker HTTP/1.1
Host: localhost:8000
```
**Description:** Retrieves problems filtered by category.

**Request Parameters:** `category` (string) - Category to filter problems (e.g., "hacker").

**Response:** List of problems under the specified category.


### 7. Get All Problem IDs

**GET** ``/api/problem/all/id``

```http

GET /api/problem/all/id HTTP/1.1
Host: localhost:8000
```

**Description:** Retrieves IDs of all problems.

**Response:** List of problem IDs.










