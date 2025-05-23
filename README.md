# Anime Database Manager - Web Application

**Live Application**: [Anime Manager](http://fraruberto.pythonanywhere.com)  

## Overview
The goal of this project was to develop a full-stack web application that allows users to interact with a database containing various anime titles, each with a set of detailed attributes such as title, genre, release year, and rating.

The base project architecture includes:
- A **Flask server** that provides a RESTful API for performing all database operations (CRUD)
- A **web interface** that enables users to interact with the API through a simple and intuitive UI

To make the application more accessible and easy to demonstrate, the complete web app has been **hosted on PythonAnywhere**.  
You can explore the live version here: [Anime Manager](http://fraruberto.pythonanywhere.com)

## Features

The application allows users to:

- **View** all anime entries in the database with full details presented in a clear, responsive interface  
- **Search** for a specific anime by ID to display its complete information  
- **Add** a new anime entry using an intuitive submission form  
- **Edit** an existing anime by searching for it via ID and updating its details  
- **Delete** anime entries from the database when no longer needed

## ⚙️ Development Methodology & Technical Implementation
The development of this web application was carried out as part of the *Web Services and Applications* course. The implementation closely followed the course labs for guidance and structure, while also incorporating independent work, external documentation, and AI support where needed.

### 🧩 Backend Development

The backend of the application is built using **Python** and the **Flask** microframework, following a RESTful architecture to expose the database operations via HTTP endpoints.

1. **Initial Structure and DAO Setup**  
   The first step was to define the foundational structure of the Flask application. I created the main application module along with a placeholder DAO class. This helped to organize the logic for data interaction separately from the route definitions.

2. **Database Design and Integration**  
   I then designed a **MySQL** database to store anime records. Each entry includes attributes such as title, genre, release year, and rating. Once the schema was finalized, I connected the database to the Flask application and began modifying the DAO and route handlers to perform actual data operations — Create, Read, Update, and Delete (CRUD).

3. **RESTful API Implementation**  
   The API layer was developed to expose endpoints for all CRUD actions. Each endpoint interacts with the database through the DAO, and returns responses in JSON format to ensure compatibility with frontend requests.

4. **Dependency Management**  
   A `requirements.txt` file was created to specify all necessary Python packages, making it easier to install and deploy the application in other environments, including the final hosting platform.

5. **App Structure**  
   To maintain a clean and modular architecture, the project was organized as follows:

anime-database-manager/
├── anime_server.py # Main Flask application with route definitions
├── animeDAO.py # Data Access Object (DAO) for database operations
├── requirements.txt # Python dependencies for the backend
├── static/ # Folder for all static frontend assets
│ ├── anime_style.css/ # Custom CSS stylesheets
│ └── anime_app.js/ # JavaScript scripts for frontend logic
├── templates/ # HTML templates rendered via Flask
│ └── anime_page.html # Main user interface
└── README.md # Project documentation

This structure helped me keep the beckend logic, database internations, and fron-end implementation well organised. It made the project easier to update and build on.

6. **Hosting**  
   To ensure public accessibility and ease of demonstration, the final version of the backend (along with the frontend) was deployed to PythonAnywhere.

---