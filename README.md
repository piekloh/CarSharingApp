**Car Sharing App**

A contenerized web application "Car Sharing App" is the system supporting management of a car rental.
It contains the basic functionalities like: adding cars to DB, displaying them, making reservations,adding opinions and more...
The app can automate storing and adding data about cars in car rental and help managing reservations.

**Functionalities of the app:**
- displaying cars already added to database on the main page,
- possiblility to open individual window of each car with details of it,
- creating accounts (including admin account with more rights),
- logging in/out system,
- adding cars to DB (available only for admin),
- deleting cars (only for admin),
- editing inromation about cars (only for admin),
- making reservations of chosen cars by each user,
- adding opinions about every car,
- deleting opinions available only for users who added them,
- displaying a profile page of every user with information about reservations, added opinions and date of creating account,
- sending an email with confirmation after creating an account,
- search bar which works when a brand or model of the car (or both) is being typed,
- filtering results by car brand,
- scroll up button.

**Technologies/libraries/languages used during the work on the project:**
-	Visual Studio Code,
-	Git,
-	MySQL,
-	Insomnia,
-	JavaScript,
-	HTML,
-	CSS,
-	Bootstrap,
-	React.js,
-	JSX,
-	npm,
-	Material UI,
-	React Router,
-	Axios,
-	Dayjs,
-	Yup,
-	Bcrypt,
-	CORS,
-	Express,
-	Express-fileupload,
-	Sequelize,
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

1. Node.js, npm and MySQL have to be installed.
2. Clone this repo with command: "git clone https://github.com/piekloh/CarSharingApp.git".
3. Create a database in MySQL.
4. Adjust information about your DB according to server/config/config.json (or change them in this file)
5. Open two terminals: one in "server" directory, one in "client" directory.
6. Run server with "npm start" in "server" folder.
7. Run React.js in "client" folder with "npm install" and then "npm start" commands.


In case of problems in point 7, typing all the following commands might help:

- rm -rf package-lock.json npm-shrinkwrap.json node_modules
- npm cache clean --force
- npm cache verify
- npm install
- npm start









