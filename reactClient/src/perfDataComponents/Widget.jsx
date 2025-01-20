import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';
import { useEffect,useState } from 'react';
import socket from '../utilities/socketConnection';

const Widget = ({data}) => {
  // console.log(data);
  const[isAlive,setIsAlive]=useState(true);
  const {
    freeMem,
    totalMem,
    usedMem,
    memUseage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    macA
  }=data;
  const cpuData={cpuLoad};
  const memData={freeMem,totalMem,usedMem,memUseage};
  const infoData={macA,osType,upTime,cpuType,cpuSpeed,numCores};
 
  const notAliveDiv=!isAlive ? <div className='not-alive'>Offline</div>:<></>;
  
  useEffect(()=>{
    socket.on('connectedOrNot',({isAlive,machineMacA,macA})=>{
      //connectedOrNot does NOT means THIS client has disconnected (or reconnected)
     // it is for one of the nodeClients that is ticking
    // we need a new event for that, because that nodeclient has stopped ticking
  //  console.log('macA',macA);
    if(machineMacA===macA){
      // console.log("isAlive",isAlive);
      setIsAlive(isAlive); //true or false, update isAlive
    }
  })
  },[])
//  console.log("isAlive",isAlive);
//  console.log('notAliveDiv',notAliveDiv);

  return (
    
    <div className='widget-all'>
     {notAliveDiv}
    <div className='widget-cpu'>
    <Cpu data={cpuData}/>
    </div>
    <div className='widget-mem'>
    <Mem data={memData}/>
    </div>
    <div className='widget-info'>
    <Info data={infoData}/>    
    </div>
    </div>

  )
}

export default Widget