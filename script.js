// Fetch information from weather API
let weatherData = null;

async function weatherInformation(place) {
    const apiKey = "9bd88715fbd045d69ad132337242205";
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${place}&aqi=no`;
    try {
        let response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        weatherData = await response.json();
        console.log(weatherData);
        console.log(weatherData.day);
        updateUI(weatherData);
    } catch (error) {
        console.log("Error: " + error);
        // Handle error in the UI
        document.querySelector('.place').textContent = "City not found";
        document.querySelector('.date').textContent = "";
        document.querySelector('.country').textContent = "";
        document.querySelector('.condition-img').src = "";
        document.querySelector('.condition-text').textContent = "";
        document.querySelector('.temperature').textContent = "";
    }
}

function updateUI(data) {
    document.querySelector('.place').textContent = `${data.location.name}, ${data.location.region}`;
    document.querySelector('.date').textContent = data.location.localtime;
    document.querySelector('.country').textContent = data.location.country;
    document.querySelector('.condition-img').src = data.current.condition.icon;
    document.querySelector('.condition-text').textContent = data.current.condition.text;
    document.querySelector('.temperature').textContent = `${data.current.temp_c}°C`;
}

document.getElementById('submitCity').addEventListener('click', () => {
    let city = document.getElementById('enterCity').value;
    if (city) {
        weatherInformation(city);
        document.getElementById('enterCity').value = "";
    }
});

document.getElementById('temperatureToggle').addEventListener('click', () => {
    if (weatherData) {
        if (document.getElementById('temperatureToggle').textContent === 'F') {
            document.querySelector('.temperature').textContent = `${weatherData.current.temp_f}°F`;
            document.getElementById('temperatureToggle').textContent = 'C';
        } else {
            document.querySelector('.temperature').textContent = `${weatherData.current.temp_c}°C`;
            document.getElementById('temperatureToggle').textContent = 'F';
        }
    }
});

// Initial call
weatherInformation('giridih');
