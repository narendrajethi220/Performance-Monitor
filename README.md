
# Performance Monitor Application       

This application built with nodeJs + SocketIO + ReactJs helps to monitor system performance by showing real time CPU usage , Memory Usage, System Info, Available Memory m, Used Memory.
This project is inspire specially from monitoring IOT sensors performance so that user do not have to check it manually.
In this application after the deployement user can also check performace of AWS instances machine hosts virtually. Application uses MAC address to identify machine, uses Socket.io-client, cluster adapters, rooms for efficient data flow. I have utilised all the threads of CPU in order to run the program efficientl and used sticky sessions(makes it so a client can find its way back to the correct worker),cluster adapters(makes it so the primary node can emit to everyone). Also I have commented function of every code so that user do not have any problem in understanding the functioning of the code.
## Acknowledgements

 - [SOCKETIO with webSockets](https://www.udemy.com/course/socketio-with-websockets-the-details/)

![Screenshot (4)](https://github.com/user-attachments/assets/dd002b16-2bab-478d-8f6e-5198d0a5e8e2)
![Screenshot (18)](https://github.com/user-attachments/assets/64c8f0d9-aa2d-4f59-9b65-cb20f8ba2455)
![Screenshot 2025-01-20 202416](https://github.com/user-attachments/assets/e6dc59b0-b3bc-4e1a-a350-b2467caf6ff3)

## Run Locally

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