import moment from 'moment';
const Info = ({data}) => {
  // console.log(data);
  return (
    <>
    <div className="info">
      <h4>Operating System</h4>
      <p>{data.osType}</p>
      <h4>Time Online</h4>
      <p>{moment.duration(data.upTime).humanize()}</p>
      <h4>Processor Information</h4>
      <p><span>Type: </span> {data.cpuType}</p>
      <p><span>Number of Cores: </span>{data.numCores}</p>
      <p><span>Clock Speed: </span>{data.cpuSpeed}</p>
    </div>
    </>
  )
}

export default Info