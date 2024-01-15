# basta-backend

Base Url [https://basta-2zr3.onrender.com/](https://basta-2zr3.onrender.com/) 

The backend project, named Basta Marketplace, is designed to facilitate the creation and management of individual booths (referred to as "Bastas") for sellers. It employs OpenAI's Speech-to-Text (STT) technology, allowing sellers to verbally provide information such as booth names, product names, and prices during the setup process. Geolocation features enable sellers to specify the physical location of their booths. The platform processes the spoken data using OpenAI's STT, transforming it into structured information. This structured data is then used to dynamically generate visually appealing display pages for each Basta. The system aims to streamline the setup and maintenance of booths, enhancing the experience for both sellers and customers in an innovative and tech-driven marketplace.

### Front End
- GitHub: [basta-frontend](https://github.com/LironSif/basta-frontend/)
- Netlify: [https://bastaproject.netlify.app/](https://bastaproject.netlify.app/)

## Team Members

- [Liron Sifado (Team Lead)](https://github.com/LironSif)
- [May Karam](https://github.com/mayoush89k)
- [Mustafa Kaddan]()
- [Simon Asmar](https://github.com/Simon1Asmar)

## Table of Contents

- [Installation](#installation)
- [Routes](#routes)
  - [1. Audio Routes](#1-audio-routes)
  - [2. Item Routes](#2-item-routes)
  - [3. User Routes](#3-user-routes)
- [Controllers](#controllers)
- [Models](#models)
- [Utilities](#utilities)
- [Error Handling](#error-handling)

## Installation

In order to install this project you'll need to clone it, install all the dependencies using npm install, then create a .env file and add the following to it MONGO_URI, PORT, ORGANIZATION_ID, OPENAI_API_KEY.

## Routes

### 1. Audio Routes

| Method | Endpoint         | Description                 |
| ------ | ---------------  | --------------------------- |
| POST   | `/api/v1/audio/` | Upload and process audio    |

### 2. Item Routes

| Method | Endpoint           | Description                           |
| ------ | ------------------ | ------------------------------------- |
| POST   | `/api/v1/items/`   | Create a new item                     |
| GET    | `/api/v1/items/`   | Get all items                         |
| PATCH  | `/api/v1/items/:id`| Update an item by ID                  |
| DELETE | `/api/v1/items/:id`| Delete an item by ID                  |

### 3. User Routes

| Method | Endpoint           | Description                           |
| ------ | ------------------ | ------------------------------------- |
| GET    | `/api/v1/users/`   | Get all users                         |
| POST   | `/api/v1/users/`   | Create a new user                     |
| PATCH  | `/api/v1/users/:id`| Update a user by ID                   |
| PATCH  | `/api/v1/users/:id`| Update user location by ID            |
| POST   | `/api/v1/users/location` | Perform navigation and get Google Maps URL |

## Controllers

- `audioController.js`: Handles audio processing.
- `itemController.js`: Manages item-related operations.
- `userController.js`: Handles user-related operations.

## Models

- `itemModel.js`: Defines the Item schema.
- `userModel.js`: Defines the User schema.

## Utilities

- `convertToWav.js`: Converts audio files to WAV format using ffmpeg.
- `openai.js`: Provides a function to get an instance of the OpenAI API.

## Error Handling

- `errorMiddleware.js`: Custom error handling middleware.

