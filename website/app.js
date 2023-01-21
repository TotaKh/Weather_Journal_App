/* Global Variables */
const myURL = 'https://localhost:3000';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '17aaea1ef3f454e2c3732c0cdb6a5f66';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(zip, feelings);
}

/* Function to GET Web API Data*/
const getWeather = async (zip, feelings) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            return postData(myURL + '/add', { 
                date: newDate,
                temp: temp,
                content: feelings,
            });
        })
        retrieveData();
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(data);
}


/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch(myURL+'/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
