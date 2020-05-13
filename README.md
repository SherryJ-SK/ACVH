# Villager Handbook 🌴

Animal Crossing related MERN stack application.

## Description
This application will allow user to search the characters in Animal Crossing, also communicate with friends through the app by sending greeting cards.


## Introduction
- **Login/Signin** 
![image](./client/public/assets/images/login.jpg "width=500")
Once the email and password have been entered, the information will be posted to the api route to verify.
![image](./client/public/assets/images/signin.jpg)
![image](./client/public/assets/images/updateInfo.jpg)
From the signin page, the new registered email will be post to and save in the data base. Once the user has been registered, the update user information component will show and allow the user to update the name and avatar, which will be saved in the database.
- **Home**
![image](./client/public/assets/images/home.png)
This page display user name and avatar, which get from the database. Daily event in the game will be got from the third party api and display in the main section. 
  - **Characters**
![image](./client/public/assets/images/characters.png)
Five random characters' information will be brought from the third party API. Also the search section allow users to search and check the information of any charaters in the game.
  - **Search Friend**
![image](./client/public/assets/images/searchFriend.png)
Search Friend route will allow users to search and add friend by searching emails, which the friend's information will be posted to the api route and will be displayed on the My Friend route.
  - **My Friends**
![image](./client/public/assets/images/friendList.png)
Friends' information got from the the database and display on this route. The 'send message' button allows user to user to post a message to friends, the message will be display in the receiver's drift bottle page.
  - **Drift Bottle**
![image](./client/public/assets/images/message.png)
The drift bottle icon will direct user to message list page, which will get the messages received from other users and listed on this route.

## Deployment
Heroku Link: https://villager-handbook.herokuapp.com/

## Acknowledge
- HTML
- CSS
  - Materialize CSS Framework
- JavaScript
  - React
  - Express
  - Express-session
  - Node
  - Nodemon
  - passport
  - redux
- MongoDB

## Author
- Sherry Jin
