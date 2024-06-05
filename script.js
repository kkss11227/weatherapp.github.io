
function abc(city){
    let api="adb28e0c7cfdb24c467a8f00a92fcb64";
    let geo=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api}`;
    return new Promise(async (resolve,reject)=>{
        try{
            let {data}=await axios.get(geo);
            data=data[0];
            const {lat,lon}=data;
            let weather=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`);
            // console.log("Weathe Data: ",weather.data.list[0]);
            weather=weather.data.list;
            // console.log(weather);
            dayWiseWeather=[]
            for (let index = 0; index < weather.length; index+=6) {
                dayWiseWeather.push(weather[index]);
            }
            
            resolve(dayWiseWeather);
        }
        catch(err){
            reject(err);
        }
    })
}

function capitalize(name){
    return name[0].toUpperCase() + name.slice(1);
}

document.querySelector(".btn").addEventListener('click',(ev)=>{
    
    ev.preventDefault();
    let city=document.querySelector('.inp').value;

    document.querySelector('.inp').value='';

    document.querySelector("section").classList.remove("hidden");
    document.querySelector("section").classList.add("display");
    
    abc(city)
    .then((d)=>{
        let data1=d[0];
        let data2=d[1];
        let data3=d[2];
        let data4=d[3];
        let temp=0;

        // TODAY
        document.querySelector('.todayDate').innerText=(data1.dt_txt).split(' ')[0];
        document.querySelector('.location').innerText=capitalize(city);

        temp=String((Number(data1.main.temp)-273).toFixed(2));
        document.querySelector('.temp').innerText=temp+ "°C";
        document.querySelector('.Description').innerText=capitalize(data1.weather[0].description);

        document.querySelector('.rain').innerText="Cloudy: "+data1.clouds.all + " %";
        document.querySelector('.humidity').innerText="Humidity: "+data1.main.humidity+ " %";
        document.querySelector('.wind').innerText="Wind Speed: "+data1.wind.deg + " m/s";


        // Day2
        temp=String((Number(data2.main.temp)-273).toFixed(2));
        document.querySelector('.date2').innerText=(data2.dt_txt).split(' ')[0];
        document.querySelector('.temp2').innerText=temp+ "°C";
        document.querySelector('.desc2').innerText=capitalize(data2.weather[0].description);

        // Day3
        temp=String((Number(data3.main.temp)-273).toFixed(2));
        document.querySelector('.date3').innerText=(data3.dt_txt).split(' ')[0];
        document.querySelector('.temp3').innerText=temp+ "°C";
        document.querySelector('.desc3').innerText=capitalize(data3.weather[0].description);

        // Day4
        temp=String((Number(data4.main.temp)-273).toFixed(2));
        document.querySelector('.date4').innerText=(data4.dt_txt).split(' ')[0];
        document.querySelector('.temp4').innerText=temp+ "°C";
        document.querySelector('.desc4').innerText=capitalize(data4.weather[0].description);
        
    })
    .catch((err)=>{
        alert(err);
    })

})