# Periodic Tables | Restaurant Reservation System

Periodic Tables is a full-stack reservation and seating system for restaurant managers and employees. A user can view reservations by date, add new reservations, edit/cancel/search for existing reservations, add new tables, and seat/unseat reservations at tables.

## Links

[Frontend](https://restaurant-reservation-client-e0db.onrender.com) deployed to Render  
[Backend](https://restaurant-reservation-server-w4o4.onrender.com/reservations) deployed to Render (use `/reservations` or `/tables` routes listed below)  

## Technology

### Frontend:

- Javascript, React, React Router, React Hooks, Bootstrap, Open Iconic, HTML, CSS  
  
![JS icon](images/javascript.png)
![React icon](images/react.png)
![Bootstrap icon](images/bootstrap.png)
![HTML icon](images/html.png)
![CSS icon](images/css.png)
  
### Backend:

- Node.js, Express, PostgreSQL, Knex  
  
![Node.js icon](images/node-js.png)
![Express icon](images/express.png)
![PostgreSQL icon](images/postgresql.png)
![Knex.js icon](images/knex.png)

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` in the backend directory to start the server locally in development mode.
1. Run `npm start` in the frontend directory to start the client app locally.

## Frontend - How the App Works

### Dashboard

The **Dashboard** page serves as the homepage for the app. The navigation bar includes links to the **Dashboard**, **Search**, **New Reservation**, and **New Table** pages. A user can toggle between different dates by clicking the **Previous Date**, **Today**, and **Next Date** buttons or select a specific calendar date with the datepicker. In the **Reservations** section, a user can see all reservations for a given date. For each individual reservation, a user can navigate to the **Seat Reservation** and **Edit Reservation** pages as well as cancel that specific reservation by clicking the appropriate buttons.  In the **Tables** section, a user can see all tables in the restaurant. For each individual table, a user can unseat a table and finish the reservation assigned to it by clicking the **Finish** button.  
  
![dashboard-photo-1](images/dashboard1.png)  
![dashboard-photo-2](images/dashboard2.png)  
  
### Search

The **Search** page allows a user to look-up reservations in the system by phone number. Partial phone numbers are acceptable inputs. If there are any reservations that match the input, they are displayed in a list that includes options to seat, edit, or cancel a reservation if its current status is _booked_. If there are no matching reservations, the user will get a "No reservations found" message.  
  
![search-photo-1](images/search.png)  
  
### New Reservation / Edit Reservation

The **New Reservation** page allows a user to create a new reservation. All fields are required and have constraints. The _Mobile Number_ must be 10 digits. The _Date of Reservation_ must be for today or a future date and cannot be on Tuesdays (when the restaurant is closed). The _Time of Reservation_ must be between 10:30am and 9:30pm. The _Number of People_ must be at least 1. If any inputs are invalid, the user will get an informative error message.  
The **Edit Reservation** page allows a user to edit an existing reservation. When a user navigates to this page, the fields will be populated with the existing reservation's current information, which the user can edit. All constraints from the **New Reservation** page are present on this page. If any inputs are invalid, the user will get an informative error message.  
  
![new-reservation-photo](images/new-reservation.png)
![edit-reservation-photo](images/edit-reservation.png)  
  
### New Table / Seat Reservation

The **New Table** page allows a user to create a new table in the restaurant. Both fields are required. The _Table Name_ must be at least two characters. The _Capacity_ must be at least 1. If any inputs are invalid the user will get an informative error message.  
The **Seat Reservation** page allows a user to seat a specific reservation at a table in the restaurant. A drop-down list provides the table options. If a table is currently occupied or does not have sufficient capacity for that specific reservation, the user will get an informative error message.  
  
![new-table-photo](images/new-table.png) ![seat-reservation-photo](images/seat-reservation.png)
  
## Backend

### Routes

The API allows for the following routes:

Method | Route | Description
 -|-|-
| `GET` | `/reservations` | Lists all reservations for the current date.
| `GET` | `/reservations?date=YYYY-MM-DD` | Lists all reservations on the query date.
| `POST` | `/reservations` | Creates a new reservation. No `reservation_id` or `status` need to be provided. All other fields are required.
| `GET` | `/reservations/:reservation_id` | Reads a specific reservation by `reservation_id`.
| `PUT` | `/reservations/:reservation_id` | Updates a specific reservation by `reservation_id`.
| `PUT` | `/reservations/:reservation_id/status` | Updates the status of a specific reservation by `reservation_id`.
| `GET` | `/tables` | Lists all tables.
| `POST` | `/tables` | Creates a new table. Only `table_name` and `capacity` need to be provided.
| `PUT` | `/tables/:table_id/seat` | Assigns a table to a reservation and changes that reservation's `status` to _seated_.
| `DELETE` | `/tables/:table_id/seat` | Removes a reservation from a table and changes that reservation's `status` to _finished_.

### HTTP Methods

| Route       | Get         | Put        | Post         | Delete       |      
| ----------- | ----------- | ---------- | ------------ | ------------ |
| ```/reservations```      | ✅      |❌      | ✅    |       ❌       |
| ```/reservations/:reservation_id```   | ✅        | ✅       | ❌         | ❌         |
| ```/reservations/:reservation_id/status```      | ❌      |✅      | ❌    |       ❌       |
| ```/tables```   | ✅        | ❌       | ✅         | ❌         |
| ```/tables/:table_id```   | ✅        | ❌       | ❌         | ❌         |
| ```/tables/:table_id/seat```   | ❌        | ✅       | ❌         | ✅         |

### Reservations

The `reservations` table represents all the reservations to the restaurant. Each reservation has the following fields:

- `reservation_id`: (Primary Key)
- `first_name`: (String) The first name of the customer.
- `last_name`: (String) The last name of the customer.
- `mobile_number`: (String) The customer's mobile phone number.
- `reservation_date`: (Date) The date of the reservation.
- `reservation_time`: (Time) The time of the reservation.
- `people`: (Integer) The size of the party.
- `Status`: (String) The reservation status can be _booked, seated, finished, or cancelled_ and defaults to _booked_.

An example record looks like the following:

```json
  {
    "first_name": "Rick",
    "last_name": "Sanchez",
    "mobile_number": "202-555-0164",
    "reservation_date": "2020-12-31",
    "reservation_time": "20:00:00",
    "people": 6,
    "status": "booked"
  }
```
### Tables

The `tables` table represents all the tables in the restaurant. Each table has the following fields:

- `table_id`: (Primary Key)
- `table_name`: (String) The name of the table.
- `capacity`: (Integer) The maximum number of people that the table can seat.
- `reservation_id`: (Foreign Key) The reservation - if any - that is currently seated at the table.

An example record looks like the following:

```json
  {
    "table_name": "Bar #1",
    "capacity": 1,
    "reservation_id": 8,
  }
```
