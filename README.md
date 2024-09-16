# Intergalatic Store

## Overview

Welcome to the Intergalactic Trade Network backend system! This system handles trade transactions, manages space cargo, and tracks inventory across multiple planets and space stations. Designed to handle high-throughput data and provide real-time updates, this system is robust and scalable to meet the demands of an interstellar trading environment.

## Overview

### High-Level Architecture

The backend system for the Intergalactic Trade Network is designed with the following components:

1. **API Gateway**
   - **Function:** Routes incoming requests to the appropriate microservices. Handles authentication and authorization.
   - **Technologies:** AWS API Gateway, Kong, or Nginx.

2. **Trade Service**
   - **Function:** Manages buying and selling transactions between space stations and planets. Handles order processing and transaction logging.
   - **Technologies:** Node.js/Express, Python/Flask, or Java/Spring Boot.

3. **Cargo Management Service**
   - **Function:** Manages cargo shipments, tracking, and delivery status. Updates cargo status based on transit and delivery information.
   - **Technologies:** Node.js/Express, Python/Django, or Java/Spring Boot.

4. **Inventory Service**
   - **Function:** Keeps track of inventory levels at space stations and planets. Manages stock updates based on trade and cargo movements.
   - **Technologies:** Node.js/Express, Python/Flask, or Java/Spring Boot.

5. **Real-Time Update Service**
   - **Function:** Provides real-time updates on trade activities and cargo status. Uses WebSockets or Server-Sent Events (SSE) for live data.
   - **Technologies:** Socket.io (Node.js), Redis Pub/Sub, or Pusher.

6. **Database**
   - **Function:** Stores data for trade transactions, cargo details, and inventory levels. Uses relational or NoSQL databases.
   - **Technologies:** PostgreSQL/MySQL (for relational), MongoDB/Cassandra (for NoSQL).

7. **Message Queue**
   - **Function:** Handles asynchronous processing and communication between services. Ensures reliable data processing and decoupling.
   - **Technologies:** RabbitMQ, Apache Kafka, or AWS SQS.

8. **Authentication Service**
   - **Function:** Handles user authentication and token management.
   - **Technologies:** OAuth2, JWT.


### Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [API Documentation](#api-documentation)
- [Diagram](#diagram-and-explanation)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/legendajar/circlepe-assignment.git
   cd circlepe-assignment

**Server** 

2. **Go to Server**

   ```bash
   cd server

3. **Run server**

   ```bash
   npm run dev

**Client**

4. **Go to Client**
    ```bash
    cd client

5. **Run Client Server**
    ```bash
    npm run dev


## Usage

### API Endpoints

The Intergalactic Trade Network provides several API endpoints for interacting with the system. Below is a summary of the key endpoints:

#### Trade Service

- **Create a Trade Transaction**
  - **Endpoint:** `POST /api/trades`
  - **Description:** Initiates a new trade transaction between space stations and planets.
  - **Request Body:**
    ```json
    {
      "tradeType": "buy" | "sell",
      "item": "item_id",
      "quantity": "number",
      "price": "number"
    }
    ```

- **Get Trade History**
  - **Endpoint:** `GET /api/trades/history`
  - **Description:** Retrieves the history of trade transactions.
  - **Query Parameters:**
    - `startDate`: (Optional) Start date for filtering trades.
    - `endDate`: (Optional) End date for filtering trades.

#### Cargo Management Service

- **Update Cargo Status**
  - **Endpoint:** `POST /api/cargo/status`
  - **Description:** Updates the status of a cargo shipment.
  - **Request Body:**
    ```json
    {
      "cargoId": "cargo_id",
      "status": "inTransit" | "delivered" | "pending"
    }
    ```

- **Get Cargo Details**
  - **Endpoint:** `GET /api/cargo/:cargoId`
  - **Description:** Retrieves details of a specific cargo shipment.
  - **Path Parameter:**
    - `cargoId`: The ID of the cargo to retrieve.

#### Inventory Service

- **Get Inventory Levels**
  - **Endpoint:** `GET /api/inventory`
  - **Description:** Retrieves the current inventory levels at all space stations and planets.
  - **Query Parameters:**
    - `location`: (Optional) Filter by location (space station or planet).

- **Update Inventory**
  - **Endpoint:** `POST /api/inventory/update`
  - **Description:** Updates the inventory levels based on trade and cargo movements.
  - **Request Body:**
    ```json
    {
      "itemId": "item_id",
      "quantityChange": "number",
      "location": "space_station" | "planet"
    }
    ```

#### Real-Time Updates

- **Subscribe to Updates**
  - **Endpoint:** `ws://yourdomain.com/ws/updates`
  - **Description:** Establishes a WebSocket connection to receive real-time updates on trade activities, cargo status, and inventory changes.

### Running the Project Locally

## Contributing

We welcome contributions to the Intergalactic Trade Network project! Whether you're fixing bugs, adding new features, or improving documentation, your help is greatly appreciated. Please follow these guidelines to ensure a smooth contribution process:

### How to Contribute

1. **Fork the Repository:**
   - Click the "Fork" button at the top right of the repository page to create a personal copy of the repository on your GitHub account.

2. **Clone Your Fork:**
   - Clone your forked repository to your local machine:

     ```bash
     git clone https://github.com/<your-username>/intergalactic-trade-network.git
     ```

3. **Create a New Branch:**
   - Create a new branch for your changes:

     ```bash
     git checkout -b feature/<your-feature-name>
     ```

4. **Make Your Changes:**
   - Implement your changes or new features. Ensure that your code adheres to the project's coding style and conventions.

5. **Write Tests:**
   - Add tests to cover your changes and ensure that existing functionality remains intact.

6. **Commit Your Changes:**
   - Commit your changes with a descriptive commit


## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

### Summary

The MIT License is a permissive free software license that allows for reuse, modification, and distribution of the software. Under this license, you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software. The license also provides that the software is provided "as is," without any warranty of any kind.
 
## API Documentation

For detailed information on the API endpoints, request and response formats, and usage examples, please refer to the API documentation:

[API Documentation](https://docs.google.com/document/d/18VRV-xxdGetBioyjsAItKd4W9oW_NC9t/edit?usp=sharing&ouid=117826824827344333512&rtpof=true&sd=true)

This documentation provides comprehensive details on how to interact with the intergalactic trade network system, including:

- **Endpoints:** A list of available API endpoints and their functionalities.
- **Authentication:** Information on how to authenticate API requests.
- **Request and Response Formats:** Details on the structure of requests and responses.
- **Examples:** Example requests and responses for various endpoints.

Ensure you review the API documentation to understand how to integrate with the system effectively.


## Diagram and Explanation

Below is a high-level diagram showing the components of the system:

```plaintext
+-----------------------------------------+
|              API Gateway                |
|-----------------------------------------|
| Handles routing, authentication, and    |
| authorization for all incoming requests.|
+---------------------+-------------------+
                      |
                      |
                      v
+---------------------+-------------------+
|    Trade Service    |  Cargo Management  |
|                     |       Service      |
| Manages transactions| Manages shipments, |
| and order processing| tracking, and      |
|                     | delivery status.   |
+---------------------+-------------------+
                      | 
                      |
                      v
+---------------------+-------------------+
|    Inventory Service|  Real-Time Update |
|                     |       Service      |
| Manages inventory   | Provides live data |
| levels and updates  | updates on trade   |
| based on trade and  | activities and     |
| cargo movements.    | cargo status.      |
+---------------------+-------------------+
                      |
                      |
                      v
+---------------------+-------------------+
|         Database    |   Message Queue   |
|                     |                   |
| Stores data related | Handles async      |
| to trades, cargo,   | communication and  |
| and inventory.      | processing between |
|                     | services.          |
+---------------------+-------------------+



   
   
