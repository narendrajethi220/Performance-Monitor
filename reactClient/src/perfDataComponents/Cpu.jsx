import '../App.css';
import {useRef} from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';
const Cpu = ({data}) => {
  // console.log(data);
  const canvasEl=useRef();
  drawCircle(canvasEl.current,data.cpuLoad);
  return (
    <div className='cpu-main'>
      CPU
    <div className='canvas-wrapper'>
       <canvas ref={canvasEl}></canvas>
       <div className='cpu-text'>{data.cpuLoad}%</div>
    </div>
    </div>

  )
}

export default Cpu