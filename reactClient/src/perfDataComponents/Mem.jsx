import {useRef} from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';
import '../App.css';

const Mem = ({data}) => {

  const {
    freeMem,
    memUseage,
    totalMem,
  }=data;
  
  const memRef=useRef();
  drawCircle(memRef.current,memUseage*100);
  const totalMemInGB=Math.floor(totalMem/1073741824*100)/100;
  const freeMemInGB=Math.floor(freeMem/1073741824*100)/100;
  // const usedMemInGB=Math.floor(usedMem/1073741824*100)/100;
  const formattedMemUsage = (memUseage * 100).toFixed(0); // Convert to percentage with 2 decimals

  
  return (
    <div className='mem-main'>
      Memory Usage
    <div className='canvas-wrapper'>
       <canvas ref={memRef}></canvas>
       <div className='mem-text'>{formattedMemUsage}%
       </div>
    </div>
    <div>
     <p><span>Available Memory:</span> {freeMemInGB} GB</p> 
    </div>
    <div >
    <p><span>Total Memory:</span> {totalMemInGB} GB</p> 
    </div>
    
    {/* <div>
     <p><span>Used Memory:</span> {usedMemInGB} GB</p> 
    </div> */}
    </div>
  )
}

export default Mem