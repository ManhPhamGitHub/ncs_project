
# [Health Declaration System](http://34.124.227.73)
Develop a simple health declaration form that accepts the following data: Name, Temperature,
Do you have any of the following symptoms now or within the last 14 days: Cough, smell/test
impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhea,
runny nose(even if your symptoms are mild)?, Have you been in contact with anyone who is
suspected to have/ has been diagnosed with Covid-19 within the last 14 days?

## Features

#### Backend:

- NestJS


#### Frontend:
- React and Ant Design (AntD)

#### Database:

- MySQL

#### Deployment:

- Dockerized for easy deployment

- NGINX as a reverse proxy for the frontend
  
- Google cloud as a compute ( http://34.124.227.73 )


## Prerequisites

- Node.js (v16 or higher)

- Docker (optional, for containerized deployment)

- MySQL (if running without Docker)

## Setup Instructions

### Running with Docker

Clone the repository:

git clone https://github.com/your-repo/health-declaration-system.git

cd ncs_project

#### Start the services using Docker Compose:

docker-compose up --build

The following services will be available:

Backend: http://localhost:3000

Frontend: http://localhost:8080

MySQL Database: localhost:3306

The backend will seed the database automatically with symptoms during startup.

#### Stop the services:

docker-compose down

### Running without Docker


#### Backend

- Preparing mysql database
- Create .env file in health_declaration_backend
- Set DATABASE_URL=<your-database-url>
- Run migrations : npm run migration:run
- Run seed data : npm run seed:run 

#### Frontend 

- Run application : npm run start

## API Reference

#### Get all symptoms

```http
  GET /api/v1/symptoms
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  |  | |

#### Create health declaration form

```http
  POST /api/healths
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. |
| `temperature`      | `number` | **Required**. |
| `symptomIds`      | `array ` | **Required**. |
| `contactWithSuspected`      | `boolean` | **Required**. |
| `additionalNotes`      | `string` | **Optional**. |



## Tests

- cd health_declaration_backend
- npm run test
