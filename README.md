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
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

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

** Client

4. **Go to Client**
    ```bash
    cd client

5. **Run Client Server**
    ```bash
    npm run dev

### Diagram and Explanation

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



   
   
