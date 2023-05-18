import React from "react";

function Weather({temp,description,icon,time}){  
    const img1 = "https://openweathermap.org/img/wn/"
    let img2 = "@2x.png"
    let weatherImageUrlW = img1+icon+img2
    let trueTime = time+24
    // console.log(weatherImageUrlW)
    return (
        <>
            <img alt="new" src={weatherImageUrlW}/>
            <div>Temp: {temp}, Time: {trueTime} hours ahead</div>
            <div>Description {description} </div>
        </>
    )
}

export default Weather;