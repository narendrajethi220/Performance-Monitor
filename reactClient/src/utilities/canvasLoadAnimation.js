const drawCircle=(canvas,currentLoad)=>{
if(canvas){
    const context=canvas.getContext('2d');
    
    //drawing inner circle
    context.clearRect(0,0,500,500)
    context.fillStyle="#d4d4d4";
    context.beginPath();
    context.arc(150,80,60,Math.PI*0 , Math.PI*2);
    context.closePath();
    context.fill();

    //drawing outer line
    //10px wide
    context.lineWidth=10;
    if(currentLoad < 20)
    {
        context.strokeStyle='#22c55e';
    }
    else if(currentLoad<40){
        context.strokeStyle='#eab308';
    }
    else if(currentLoad<60){
        context.strokeStyle='#f97316';
    }
    else {
        context.strokeStyle='#ef4444';
    }
    context.beginPath();
    context.arc(150,80,65,Math.PI*1.5,(Math.PI*2*currentLoad/100)+Math.PI*1.5);
    context.stroke();
}

}
export default drawCircle;