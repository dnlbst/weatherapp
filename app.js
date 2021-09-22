//for dom manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUi = (data) => {

    console.log(data);

    // destructure properties : stores the properties of a object in a const of the same name
    const { cityDets, weather } = data; //from this data objects it stores the cityDets properties in a const called cityDets and does the same for weather.
                                        //it does exactly the same as above
                                        //before:
                                        // const cityDets = data.cityDets; //storing the both diffenret properties from data in variables again for shorter typo later
                                        // const weather = data.weather;                                    

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);


    // remove the d-none class if present
    if(card.classList.contains('d-none')){ //if true it meand it has that class
        card.classList.remove('d-none'); //then remove that class
    };
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();  //city is the class(name) of the input
    cityForm.reset();

    //update the id with new city
    forecast.updateCity(city)
        .then(data => updateUi(data)) //the return value from updatecity is passed in this then method
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

});

//outside of eventlistener we want to check it after every reload and pass it over to the ui
//check if there is already a city stored with if check. if not it returnes null and do nothing
if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUi(data))
    .catch(err => console.log(err))
}
