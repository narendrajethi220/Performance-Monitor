// socket.io listerners and most emitters

const socketMain = (io) => {
  io.on("connection", (socket) => {
    let machineMAC;
    const auth = socket.handshake.auth;
    //    console.log("auth token:",auth.token);
    if (auth.token === "yeDilMaangeMore") {
      //valid node client
      socket.join("nodeClient"); //this client is a nodeClient, put in appropriate room
    } else if (auth.token === "Oyayaya") {
      //valid react client
      socket.join("reactClient");
    } else {
      socket.disconnect();
      console.log("You have been disconnected! Bye!");
    }

    console.log(`Someone connected on worker ${process.pid}`);
    socket.emit("welcome", "Welcome to our cluster driven socket.io server!");

    socket.on("perfData", (data) => {
      //   console.log("tick...")
      //    console.log(data);
      if (!machineMAC) {
        machineMAC = data.macA;
        io.to("reactClient").emit("connectedOrNot", {
          isAlive: true,
          machineMAC,
        });
      }
      io.to("reactClient").emit("perfData", data);
    });
    socket.on("disconnect", (reason) => {
      //a nodeClient just disconnected, let the front end know!
      io.to("reactClient").emit("connectedOrNot", {
        isAlive: false,
        machineMAC,
      });
    });
  });
};
module.exports = socketMain;
