# Student Management API  

This API provides endpoints for managing students. It supports operations such as adding, retrieving, updating, and deleting student records.

## Table of Contents  
- [Features](#features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Endpoints](#endpoints)  

---

## Features  
- Add new students to the system.  
- Retrieve all students or search by specific criteria.  
- Update student information.  
- Delete student records by ID.  

---

## Installation  

1. Clone this repository:  
   ```
   git clone <repository_url>  
   ```  
2. Navigate to the project directory:  
   ```
   cd <project_directory>  
   ```  
3. Install dependencies:  
   ```
   npm install  
   ```  
4. Start the application:  
   ``` 
   npm start  
   ```  

---

## Usage  

### Base URL  
The base URL for the API is:  
```
http://localhost:<PORT>/students
```  

Replace `<PORT>` with the port number the server is running on (default: 3000).  

---

## Endpoints  

### 1. Add a New Student  
**POST** `/students`  
- **Description:** Register a new student.  
- **Request Body:**  
  ```json  
  {
    "name": "John Doe",
    "year": 2025,
    "course": "Computer Science"
  }  
  ```  

---

### 2. Retrieve All Students  
**GET** `/students`  
- **Description:** Retrieve a list of all students.  

---

### 3. Find Students by Name  
**GET** `/students/name/:name`  
- **Description:** Retrieve students matching the given name.  
- **Path Parameter:**  
  - `name`: Name of the student.  

---

### 4. Find Students by Inscription Number  
**GET** `/students/inscription/:inscription`  
- **Description:** Retrieve students by their inscription number.  
- **Path Parameter:**  
  - `inscription`: Inscription number of the student.  

---

### 5. Find Students by Course  
**GET** `/students/course/:course`  
- **Description:** Retrieve students enrolled in a specific course.  
- **Path Parameter:**  
  - `course`: Name of the course.  

---

### 6. Delete a Student by ID  
**DELETE** `/students/:id`  
- **Description:** Remove a student record.  
- **Path Parameter:**  
  - `id`: Unique identifier of the student.  

---

### 7. Update a Student by ID  
**PUT** `/students/:id`  
- **Description:** Update student information.  
- **Path Parameter:**  
  - `id`: Unique identifier of the student.  
- **Request Body:**  
  ```json  
  {
    "name": "Jane Doe",
    "course": "Mathematics"
  }  
  ```  

---

## Contribution  

Feel free to fork this repository and submit pull requests.  
