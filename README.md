**Car Sharing App**

A contenerized web application "Car Sharing App" is the system supporting management of a car rental.
It contains the basic functionalities like: adding cars to DB, displaying them, making reservations,adding opinions and more...
The app can automate storing and adding data about cars in car rental and help managing reservations.

The whole app has been contenerized in Docker.
Each part of the app (React.js frontend, Node.js backend, MySQL database) has been placed in separate Docker container.
All of them works together and cooperate thanks to Docker Compose.

**Functionalities of the app:**
- displaying cars already added to database on the main page,
- possiblility to open individual window of each car with its details,
- creating accounts (including admin account with more rights),
- logging in/out system,
- adding cars to DB (available only for admin),
- deleting cars (only for admin),
- editing infomation about cars (only for admin),
- making reservations of chosen cars by each user,
- adding opinions about every car,
- deleting opinions available only for users who added them,
- displaying a profile page of every user with information about reservations, added opinions and date of creating account,
- sending an email with confirmation after creating an account,
- search bar which dynamically updates content of the vehicles list,
- filtering results by car brand,
- scroll up button.

**Technologies/libraries/languages used during the work on the project:**
- React.js
- Node.js
-	MySQL,
-	Express,
-	npm,
-	Visual Studio Code,
-	Git,
-	JavaScript,
-	HTML,
-	CSS,
-	Sequelize,
- Docker
- Docker Compose
-	Bootstrap,
-	JSX,
-	Material UI,
-	React Router,
-	Axios,
-	Dayjs,
-	Yup,
-	Bcrypt,
-	CORS,
-	Insomnia,
-	Express-fileupload,
-	JSON Web Token (JWT),
-	Multer,
-	Nodemon.

**Preview:**

![obraz](https://user-images.githubusercontent.com/81360745/192820808-ecd6560d-15d0-4fef-851d-288421497e57.png)

Image 1. Main page, logged as admin


![obraz](https://user-images.githubusercontent.com/81360745/192821329-4c08d118-4b64-4f56-85da-3352c8480d50.png)

Image 2. Individual page of a car (pt.1/3)


![obraz](https://user-images.githubusercontent.com/81360745/192828717-1a71ab0f-a771-42ee-9aa2-04c030d6f550.png)

Image 3. Individual page of a car (pt.2/3)


![obraz](https://user-images.githubusercontent.com/81360745/192821678-912b60a1-a7bb-4d76-a120-a7d24aaf9ac3.png)

Image 4. Individual page of a car (pt.3/3)


![obraz](https://user-images.githubusercontent.com/81360745/192821938-79ff3896-4bcd-4439-9e69-59c5bd45c27f.png)

Image 5. Reservation datepicker with some disabled dates


![obraz](https://user-images.githubusercontent.com/81360745/192822191-0a1c0126-8100-4a42-8915-58c3c095b6bc.png)

Image 6. Filtering results with "Add a car" button at the bottom


![obraz](https://user-images.githubusercontent.com/81360745/192823834-39a3b85c-9559-4af4-903c-e4f75764eb62.png)

Image 7. Adding car form


![obraz](https://user-images.githubusercontent.com/81360745/192824186-1ba05fbf-1f00-4d97-952c-8e04332bea6e.png)

Image 8. Profile info with "scroll up" button in the right bottom of the page


![obraz](https://user-images.githubusercontent.com/81360745/192824501-69a0e734-3b0c-413f-a099-dc407bf4b1a0.png)

Image 9. Working search bar



**How to get started with the project?**
1. A machine with Docker and Docker Compose installed is needed. For example Windows Subsystem for Linux (WSL2) might be a good option.
2. Clone repo e.g. with command: "git clone https://github.com/piekloh/CarSharingApp.git".
3. Change directory to app root folder (cd CarSharingApp/)
4. Run "docker-compose up --build -d"
5. App will be available on localhost:3000 and backend serves on localhost:3001.





