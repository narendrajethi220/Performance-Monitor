
# Performance Monitor Application       

## 🎯 Objective
A real-time system monitoring application that tracks system performance metrics.

## 🚀 Features
Real-time Monitoring: Tracks CPU and memory usage using Socket.IO.
Scalability: Uses cluster adapters and sticky sessions for load balancing and high concurrency.
Device Identification: Integrates MAC address tracking to identify connected devices.
Dashboard Visualization: Displays performance metrics using a React.js frontend.

## 🧑‍💻 Tech Stack

Backend: Node.js, Express, Socket.IO
Frontend: React.js
Scalability: Cluster Adapters, Sticky Sessions
System Monitoring: OS Module, Process Management

## 🪈 API & Socket Implementation
Cluster-based Socket.IO Setup
Uses cluster module to spawn multiple worker processes for better performance.
Implements sticky sessions to ensure users reconnect to the same worker.
Integrates cluster adapter to enable communication across worker nodes.

## 📼 Socket.IO Event Handling (socketMain.js)
Event        Description
connect      Establishes a new WebSocket connection
disconnect   Handles disconnection events
system-info  Sends real-time CPU and memory usage to the client
mac-address  Identifies and stores the MAC address of connected devices

 - [SOCKETIO with webSockets](https://www.udemy.com/course/socketio-with-websockets-the-details/)

![Screenshot (4)](https://github.com/user-attachments/assets/dd002b16-2bab-478d-8f6e-5198d0a5e8e2)
![Screenshot (18)](https://github.com/user-attachments/assets/64c8f0d9-aa2d-4f59-9b65-cb20f8ba2455)
![Screenshot 2025-01-20 202416](https://github.com/user-attachments/assets/e6dc59b0-b3bc-4e1a-a350-b2467caf6ff3)

## 🏃‍➡️ Run Locally

Clone the project

```bash
  git clone https://github.com/narendrajethi220/Performance-Monitor.git
```

Go to the project directory

```bash
  cd Performance Monitor Application
  cd reactClient
  npm install

  cd nodeClient
  npm install

  cd server
  npm install

```

Install dependencies

```bash
  npm install
```

Start the server
```bash
nodemon start server
```

Start the nodeClient
```bash
node index.js       
```

Start the reactClient
```bash
npm run dev
```
## 🔮 Future Enhancements
Add database storage for performance logs.
Implement WebSocket authentication for secure connections.
Introduce alert notifications for critical system conditions.

### Developed with ❤️ by Narendra Jethi
