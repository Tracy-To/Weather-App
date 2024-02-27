window.onload = () => {

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.querySelector('input[type="text"]').value
    const apiURL = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';
    const forecastApiURL = 'http://api.weatherapi.com/v1/forecast.json?key=62929ddcb4084a30bd1192341242402&q=';

// Fetch current weather data
  fetch(apiURL + userInput, {
    headers: {
      'X-RapidAPI-Key': 'bfe674945bmshfae870045f19b34p1e0a26jsn9cb69d01e17a',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  }
    ).then(
      (data) => {
        return data.json()
      }, 
      (err) => {
        console.log("Error: ", err)
      }
    ).then(
      (json) => {
        console.log("Current Weather JSON DATA: ", json)
        if(json.location && json.current) {

          // show picture of weather 
          const weatherIcon = document.querySelector('#picture')
          weatherIcon.src = `https:${json.current.condition.icon}`
          weatherIcon.alt = json.current.condition.text

          // have picture become visible as a block-level element after the user has entered and submitted a valid city name
          weatherIcon.style.display = 'block'

          weatherIcon.src = `https:${json.current.condition.icon}`
          weatherIcon.alt = json.current.condition.text

          // show temperature (rounded)
          document.querySelector('#temperature').innerText = Math.round(json.current.temp_f) + "°F"

          // show weather description
          document.querySelector('#description').innerText = json.current.condition.text

          // show city name
          document.querySelector('#city').innerText = json.location.name

          // show date and time
          document.querySelector('#time').innerText = json.current.last_updated
          
        } else {
          alert("City not found. Please try again.")
        }
      },
      (err) => {
        console.log(err)
        }
      )

// Fetch forecast data
fetch(forecastApiURL + userInput + '&days=1&aqi=no&alerts=no')
      .then(
        (data) => {
          return data.json();
        },
        (err) => {
          console.log("Error: ", err);
        }
      )
      .then(
        (json) => {
          console.log("Hourly Forecast JSON DATA: ", json)

          // check if forecast data and forecast data for the day exists, and then check if at least one day/24 hours of data is avilable
          if (json.forecast && json.forecast.forecastday && json.forecast.forecastday.length > 0) {

            // use the hourly forecast for the first day 
            const hourlyForecast = json.forecast.forecastday[0].hour

            // use the first 24 hours that appear
            const next24Hours = hourlyForecast.slice(0, 24)

            // go through the next 24 hours and create a string with the time, temperature (rounded), and weather description
            const forecastText = next24Hours.map(hour => `${hour.time}: ${Math.round(hour.temp_f) + "°F"}, ${hour.condition.text}`).join('\n');
            document.querySelector('#forecast').innerText = `Today's Forecast:\n\n${forecastText}`;
          }
        },
        (err) => {
          console.log(err)
        }
      )
  } )
}

// Error message backup code
// document.querySelector('#weather-items').style.display = 'none'
//           const errorMessage = document.createElement('h1')
//           errorMessage.innerText = "City Not Found"
//           document.querySelector('#weather-prompt').append(errorMessage)
