import { useEffect,useState } from 'react';
import socket from './utilities/socketConnection';
import Widget from './perfDataComponents/Widget';
import "./App.css";

const App = () => {
  const [performanceData,setPerformanceData]=useState({})
  useEffect(()=>{
    //socket was created on load of the component
    //adding a listener to that socket!
    socket.on('perfData',(data)=>{
      //we just got some data!
      // console.log("data",data);
      //copying performanceData so we can mutate it!
      const copyPerfData={...performanceData};
      //performanceData is NOT an array. its an{}
      //this is because we do not know which machine just set it's data
      //so we can use the MAC address of the machine as it's property in performanceData
      //every tick the data comes through , just over 
     copyPerfData[data.macA]=data;
     setPerformanceData(copyPerfData);
    //  console.log("performance data",performanceData);
    })
  },[]) //running this once when the component has rendered
  // const widget=Object.values(performanceData).map(d=><Widget data={d} key={d.macA}/>);
  return (
    <>
    <h1 className='main-heading'>Performance Monitoring Application</h1>
   <div className='main-widget'>
   {Object.values(performanceData).map(d=><Widget data={d} key={d.macA}/>)}
   </div>
  
   </>
  )
}

export default App