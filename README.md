# Node.js IoT Sensor Backend

## Overview

This project is a **Node.js backend service** that simulates ingestion of IoT sensor temperature data. It is designed to demonstrate how a backend can handle **real-time data ingestion**, store it in a database, and provide APIs to access the latest readings.  

Key functionalities include:

- **HTTP API** to accept sensor data (POST `/api/sensor/ingest`)
- **Retrieve the latest reading** for any device (GET `/api/sensor/:deviceId/latest`)
- **MQTT subscriber** to receive real-time sensor messages (bonus feature)
- Persistent storage in **MongoDB Atlas**

---

## Tech Stack

- **Node.js 18+** – runtime environment  
- **Express.js** – backend REST API framework  
- **MongoDB Atlas** – cloud database  
- **Mongoose** – object modeling for MongoDB  
- **MQTT** – message protocol for real-time IoT ingestio
- **dotenv** – environment variable management  

---


---

## Features

1. **Ingest Sensor Data (HTTP POST)**  
   - Endpoint: `/api/sensor/ingest`  
   - Validates required fields (`deviceId`, `temperature`)  
   - Uses current timestamp if none is provided  

2. **Retrieve Latest Reading (HTTP GET)**  
   - Endpoint: `/api/sensor/:deviceId/latest`  
   - Returns the latest temperature reading for the specified device  

3. **MQTT Subscriber (Bonus)**  
   - Listens to topic: `iot/sensor/<deviceId>/temperature`  
   - Automatically inserts messages into MongoDB  
   - Supports real-time ingestion simulation  

4. **MongoDB Persistence**  
   - Stores: `deviceId`, `temperature`, `timestamp`, `createdAt`  
   - Easy to query for analytics or dashboards  

---

## Flow Diagram

       +-------------------+
       |   IoT Device      |
       | (simulated via    |
       | HTTP POST / MQTT)|
       +---------+---------+
                 |
                 v
       +-------------------+
       | Node.js Backend   |
       | Express + MQTT    |
       +---------+---------+
                 |
                 v
       +-------------------+
       | MongoDB Atlas     |
       | SensorReadings    |
       +-------------------+
---
## Setup & Running the Project

1. **Clone the repository**
   - git clone <your-repo-url>
   - cd iot-sensor-backend

2. **Install dependencies**
    npm install

3. **Configure environment variables**

    - Create a .env file in the project root:
      PORT=5000
      MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/iotDB
    Replace <username> and <password> with your MongoDB Atlas credentials.

4. **Start the server**

    - Development mode (auto-reload):
      npm run dev
      
    - Production mode:
      npm start
      
5. **Verify the server**

    You should see in the terminal:
    
    Server running on port 5000
    MongoDB connected
    MQTT connected

6. **Test the APIs**

    POST /api/sensor/ingest
    
    curl -X POST http://localhost:5000/api/sensor/ingest \
    -H "Content-Type: application/json" \
    -d '{"deviceId":"sensor-01","temperature":32.5}'
    
    
    GET /api/sensor/:deviceId/latest
    
    curl http://localhost:5000/api/sensor/sensor-01/latest

7. **Test MQTT**

    Use HiveMQ public broker (broker.hivemq.com) and publish a message:
    
    Topic: iot/sensor/sensor-01/temperature
    
    Message: 30.2
    
    Backend will automatically insert it into MongoDB.

---
