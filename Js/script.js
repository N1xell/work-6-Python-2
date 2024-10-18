// API Key and base URL
const apiKey = 'your_api_key';  // Вставте свій API-ключ
const city = 'Kyiv';            // Місто, для якого відображатимемо погоду
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const weatherDiv = document.getElementById('weather');
const recommendationDiv = document.getElementById('pizza-recommendation');

// Function to fetch weather data
async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
        recommendPizza(data);
    } catch (error) {
        weatherDiv.innerHTML = 'Failed to load weather data.';
        console.error(error);
    }
}

// Function to display weather data
function displayWeather(data) {
    const { main, weather, name } = data;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    weatherDiv.innerHTML = `Current weather in ${name}: ${temperature}°C, ${weatherDescription}`;
}

// Function to recommend pizza based on weather
function recommendPizza(data) {
    const temperature = data.main.temp;
    let recommendation = '';

    if (temperature > 25) {
        recommendation = 'It\'s hot outside! How about a light Margherita pizza?';
    } else if (temperature > 15 && temperature <= 25) {
        recommendation = 'Perfect weather for a Pepperoni pizza!';
    } else if (temperature > 5 && temperature <= 15) {
        recommendation = 'How about a Four Cheese pizza to warm you up?';
    } else {
        recommendation = 'It\'s cold outside! A Spicy Mexican pizza will keep you warm!';
    }

    recommendationDiv.innerHTML = recommendation;
}

// Call the function to get weather data on page load
getWeather();
