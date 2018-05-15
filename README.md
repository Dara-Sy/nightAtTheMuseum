# nightAtTheMuseum - Project 3 


## Project Name: Night at the Museum

## Description: 

We are creating a React/Express Full CRUD App that uses Google Maps API to help users to track, search, and favorite museums all around. Searches can be filtered by city or zip code.

- CRUD App List Builder
- Database that lists museums all around 
- Consumers/users can search, save, and add to the list of museums 
- Users can search up cafes by city or zip code 
- Post MVP Features allow users to edit account info 

## User Story: 
(1) Before hopping on my plane back to Paris, I wanted to check out NY's acclaimed museums. I think an app that can filter my searches would be very helpful. 
(2) I am a graphic design student. I need to visit an  art museum this weekend. To find museums at a quick search and accessibility would be a valuable resource. 

## Wireframe:

![1](https://git.generalassemb.ly/DAP/project-3/blob/master/IMG_0037.jpg)


## Piority Matrix:

![1](https://git.generalassemb.ly/DAP/project-3/blob/master/IMG_0038.jpg)

## ERD:

![1](https://git.generalassemb.ly/DAP/project-3/blob/master/IMG_0039.jpg)

Updated faves table in ERD 

![1](https://git.generalassemb.ly/DAP/project-3/blob/master/faves%20table.jpg)

## React Tree: 

![1](https://git.generalassemb.ly/DAP/project-3/blob/master/appjs.jpg)


## Technologies: 
- React - used to render the views of the CRUD app
- HTML - used to render the views of the CRUD app
- Node and Express - the modules for the CRUD app 
- MVC Pattern - the Models, Views, Controllers for the CRUD app 
- SQL / PG-PROMISE - to organize the database tables 
- CSS & Design - to make the CRUD app presentable 
- Google Maps API - to map/locate the museums

## Installation Instructions: 
- Go into this repo
- Fork and Git Clone
- Go into the Terminal Command Line
- npm i 
- npm init 
- npm bothdev
- subl . 
- npm run bothdev
- psql -f db/schema.sql



## CRUD App Components

### Landing Page
What will a user/guest see when they start your app?
The landing view will have a log in option and sign up option. 

###  App Initialization & Using the App
A user can fill out a form to search up museums by location (city or zip code). Users can view museums in the search results and view them individually on a page, and favorite museums. 


## MVP 

Include the full list of features that will be part of your MVP 
- Pseudocode and organization
- Landing View
- List View
- Form 
- Event Listeners
- Searching List
- Adding to Favorite List
- API
- CRUD 
- React Components 
- JWT
- Controllers
- Styling/CSS



## POST MVP

Include the full list of features that you are considering for POST MVP
- Edit account info 


## Functional Components
|   Component   |   Priority    |   Est Time (Hrs)  |   Time Invested (Hrs) |   Actual Time (Hrs)   |
|   --- |   :---:   |   :---:   |   :---:   |   :---:   |
|   Database Creation   |   H   |   0.5   |   0.5   |   0.5 |
|   Server   |   H   |   0.5   |   2   |   2 |
|   React Components   |   H   |   6   |   11   |   11 |
|   Controllers   |   H   |   3.5   |   5   |   5 |
|   Routes   |   H   |   4.5   |   4   |   4 |
|   Models   |   H   |   8   |   5   |   5 |
|   Collecting Data on API   |   M   |   2   |   5    |   5    |
|   Create   |   H   |   1 |   2 |   2 |
|   Read   |   H   |   1   |   1    |    1   |
|   Update  |   H   |   4   |   3    |   3    |
|   Delete    |   H   |   4   |   3    |   3   |
|   API Integration - Research    |   H   |   0.5   |   0.5    |   0.5    |
|   API Integration - Planning    |   H   |   1 |   1    |   1    |
|   API Integration - Development |   H  |   3 |   4    |   4    |
|   Creating MakeFake User Data    |   M   |   1   |   1    |   1    |
|   JWT (JSON Web Token)   |   H   |   6   |   4   |   4 |
|   CSS/Styling   |   L   |   6   |   6   |   6 |
|   Sum Hours   |       |   45    |   53   |   53 |





## Break Down
|   Login   |   Register    |   User Profile/Faves  |   Search |   Museum Profile   |
|   --- |   :---:   |   :---:   |   :---:   |   :---:   |
|   2 inputs   |   fname   |   Faves table   |   Searchbar   |   API (from the API Call)  |
|       |   lname   |   Museums table |   API Call |   Render  |
|       |   username   |   JSON |   Faves table |     |
|       |   password   |    |   Triple join |     |
|       |   Auth Service   |       |   JSON   |     |
|       |   Users table   |      |       |     |



## Dividing the Work
|   Dara   |   Lance    |   Arleigh  |  Phil  |
|   --- |   :---:   |   :---:   |   :---:   | 
|   Readme   |   Server: Models   |   React: Museums   |   Starting Templates   |
|   Server: Render    |   Server: Routes   |   React: Faves |   Login  |
|   Server: Controllers    |    React: Search      |  React: User Profile    |  Register  | 
|   React: Search    |   Design: CSS     |      |  Server  | 
|   Design: CSS    |         |      |  Search  | 









## Additional Technologies
 Use this section to list all supporting libraries and thier role in the project. 
 - Google Maps API

## Resources

- Google API
- Google
- Stack Overflow 
- MDN 


