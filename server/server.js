// Socket.io server which will serve both node and react clients.
//Requirements: 
// - socket.io
// - @socket.io/cluster-adapter
// - @socket.io/sticky

// Entry point for our clusterwhich will make workders and the workders will do the Socket.io handling 
//The cluster  module allows easy creation of child processes that all share server ports.

const cluster=require('cluster');
const http=require('http');
const {Server}=require('socket.io');
const numCPUs=require('os').cpus().length;
const {setupMaster,setupWorker}=require("@socket.io/sticky"); // makes it so a client can find its way back to the correct worker
const {createAdapter, setupPrimary }=require('@socket.io/cluster-adapter'); // makes it so the primary node can emit to everyone
const socketMain=require('./socketMain');

if(cluster.isMaster){ //Determines if the current process is the master/parent process
    console.log(`Master ${process.pid} is running`);
    const httpServer=http.createServer();

    //setting up sticky sessions
    //clients reconnect to the same worker process for persistent connections
    setupMaster(httpServer,{
        loadBalancingMethod:"least-connection",
    })

    //setting up connections between the workers and the master process
    setupPrimary(); 
  
    // needed for packets containing buffers (we can ignore it if we only send plaintext)
    //Configures message serialization for efficient communication between processes
    cluster.setupPrimary({
        serialization:"advanced",
    })

    httpServer.listen(3000); // will face the internet

    //Forks worker processes (cluster.fork()) based on the number of CPU cores (numCPUs).
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }

    //Listens for worker process exit events (cluster.on("exit")) and restarts the exited worker process.
    cluster.on("exit",(worker)=>{
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
}else {
    console.log(`Worker ${process.pid} started`);
    
    const httpServer=http.createServer();
    const io=new Server(httpServer,{
        cors:{
            origin:'http://localhost:5173',
            credentials:true,
        }
    });

    //using the cluster adapter
    io.adapter(createAdapter());

    //setting up the connection with the primary process
    setupWorker(io);

    //socketMain is our file where our emits and listens happens
    //it needs the io object
    socketMain(io);
}