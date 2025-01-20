// The node program that captures local performance data ,
// sends it to the server
// Requirement : - socket.io-client
const os=require('os');
const io=require('socket.io-client');
const options={
  auth:{
    token:"yeDilMaangeMore"
  }
}
const socket=io('http://localhost:3000',options);
socket.on('connect',()=>{
  console.log('We connected to the server'); 
  // we need a way to identify this machine to the server, for front-end useage 
  const ni=os.networkInterfaces();
  let macA;
  for(let key in ni){
    let isInternetFacing=!ni[key][0].internal;
    if(isInternetFacing){
      macA=ni[key][0].mac;
      break;
    }
  }
  // console.log(macA);
  const perfDataInterval=setInterval(async()=>{
      //every second calling performance data and emit
      const perfData=await performanceLoadData();
      perfData.macA=macA;
      socket.emit('perfData',perfData);
  },1000);

  socket.on('disconnect',()=>{
    clearInterval(perfDataInterval); // if we disconnect for any reason ... stop ticking and this also includes reconnect
  })
})

function cpuAverage(){
  //cpus is an array of all cores. We need the average of all the cores which will give us the cpu average.
  const cpus=os.cpus();

  let idleMs=0;  //idle milliseconds
  let totalMs=0; //total milliseconds
 //looping through each logical core
  cpus.forEach(aCore=> {
    //looping through each property of the current core
    for(mode in aCore.times){
      //we need all nodes for this core added to toalMs
      totalMs+=aCore.times[mode];
    }
    //we need idle mode for this core added to idleMS
    idleMs+=aCore.times.idle;
  })
  return {
    idle: idleMs/cpus.length,
    total:totalMs/cpus.length
  }
}


//  As the times property on cpus is time since boot, we will get now times, and 100ms from "now" times. Compare them, that will give us th current load
const getCPULoad=()=> new Promise ((resolve,reject)=>{
  // call cpuAverage for now
  const start=cpuAverage(); // "now " value of load
  setTimeout(()=>{
    //call cpuAverage for "end" 100ms after now
    const end=cpuAverage(); //"end" value of load
    const idleDiff=end.idle-start.idle;
    const totalDiff=end.total-start.total;
    // console.log(idleDiff,totalDiff);
    //calculating the percentage % of the used cpu
    const percentageOfCPU=100-Math.floor(100* idleDiff/totalDiff);
    // console.log("CPU %:",percentageOfCPU);

    resolve(percentageOfCPU); // we need to resolve cpu percentage when we are confident that the percentage of CPU is done
  },100)
})


const performanceLoadData=() => new Promise (async(resolve,reject)=>{
  
// Ques - What do we need to know FROM NODE about performance ?
// CPU Load (current),
 const cpus=os.cpus(); // information about each logical CPU core i.e., equal to threads 
 //its a snapshot of the data at the time of calling and it does not run again
// console.log("cpus:",cpus);


//  Memory Usage - total , free ,
  //-total mem
  const totalMem=os.totalmem();
  // console.log("Total Memory(bytes):",totalMem);
  
  //-free Mem
  const freeMem=os.freemem();
  // console.log("Free Memory(bytes):",freeMem);
  
  //-memory usage
  const usedMem=totalMem-freeMem;
  const memUseage=Math.floor(usedMem/totalMem *100)/100;
  // console.log("Memory Usage:",memUseage);



// OS type
const osType=os.type();
// console.log("OS Type:", osType);

// uptime (Time online)
const upTime=os.uptime();
// console.log("OS Uptime(seconds):", os.uptime());
// CPU info
    // Type
    const cpuType=cpus[0].model;
   // Number of cores
   const numCores=cpus.length;
  //  Clock speed
  const cpuSpeed=cpus[0].speed;
  // console.log("CPU Type:", cpuType);
  // console.log("Number of Cores(Logical):", numCores);
  // console.log("CPU Speed:", cpuSpeed);
 
  const cpuLoad=await getCPULoad();
  resolve({
    freeMem,
    totalMem,
    usedMem,
    memUseage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad
  })
})

// const run =async()=>{
//   const data=await performanceLoadData();
//   console.log(data);
// }
// run();