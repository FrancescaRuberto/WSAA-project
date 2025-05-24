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

## Development Methodology & Technical Implementation
The development of this web application was carried out as part of the *Web Services and Applications* course. The implementation closely followed the course labs for guidance and structure, while also incorporating independent work, external documentation, and AI support where needed.

### Backend Development

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

- **anime-database-manager/**
  - `anime_server.py` — Main Flask application with route definitions
  - `animeDAO.py` — Data Access Object (DAO) for database operations
  - `requirements.txt` — Python dependencies for the backend
  - **static/** — Folder for all static frontend assets
    - `anime_style.css` — Custom CSS stylesheets
    - `anime_app.js` — JavaScript scripts for frontend logic
  - **templates/** — HTML templates rendered via Flask
    - `anime_page.html` — Main user interface
  - `README.md` — Project documentation

This structure helped me keep the beckend logic, database internations, and fron-end implementation well organised. It made the project easier to update and build on.

6. **Hosting**  
   To ensure public accessibility and ease of demonstration, the final version of the backend (along with the frontend) was deployed to PythonAnywhere.

---

### Frontend Development

The frontend was designed to give users a simple and clear way to interact with the anime database. It connects smoothly with the Flask backend API and lets users view, add, update, and delete anime entries easily.

#### 1. Project Structure  
To keep things organized, the frontend code is divided into folders:  
- `templates/` contains the HTML files rendered by Flask  
- `static/` holds all the static files like CSS and JavaScript 

This separation makes the code easier to maintain and update.

#### 2. HTML and CSS  
The HTML was based on examples from the course labs, with additional adjustments to improve layout and usability. It uses clean and semantic tags to organize the page content well.  
The CSS was written to make the website look clean and organized. The layout adjusts well to different screen sizes, so the site is easy to use both on desktops and on mobile devices. Colors, fonts, and spacing were carefully chosen to make the interface easy to read and visually pleasant.

#### 3. JavaScript and API Communication  
JavaScript handles dynamic actions on the page, such as:  
- Fetching data from the Flask API and showing it without reloading the page  
- Sending form data to create or update anime entries via API calls  
- Updating the page instantly after each operation to give users real-time feedback  

While working on the JavaScript, especially for the update (PUT) functionality, I used AI tools to help write and debug some tricky parts. At first, I had trouble properly connecting the update feature to the backend, so it didn’t work correctly. Using AI assistance helped me fix those issues and get the update process running smoothly.

#### 4. User Experience  
The frontend gives clear feedback to users after every action:  
- Showing updated data right away  
- Displaying success or error messages  
- Preventing multiple submissions during loading  

This makes the app easy and reliable to use.

Thanks to this clear structure and responsive design, the frontend offers a friendly and effective way to manage the anime database.

---

### Website Overview

The web application homepage provides a user-friendly interface to mange the anime database. Here's what you you do and find in the page:

- **View All Anime** 
  By clicking on this option, all anime currently stored in the database are shown in a clear, tabular format including all details like author, release year, genre, rating, and so forth.

- **Search by ID** 
  This option allow the user to search for a specific anime by entering its ID in the search box. This retrieves all the details of the chosen anime and diplays them on the page.

- **Add New Anime**
  This option allow the use to add a new anime to the database by filling out a form with all relevant details (title, author, genre, etc.). Submitting the form sends the data to the backend to create a new record in the database.

- **Edit Existing Anime** 
  After having searched the anime by ID, the user can use this option to edit the detials of an anime already existing in the database. The user can update its details using the edit form. The changes are sent to the backend to update the database accordingly.

- **Delete Anime**
  This option allows users to delete an existing anime by specifying its ID, removing it from the database permanently.

Throughout the site, user actions provide immediate feedback, including success confirmations or error messages, ensuring a smooth and interactive experience.
