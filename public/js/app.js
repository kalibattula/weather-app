



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const weatherResponse = document.getElementById('weather-data')

weatherForm.addEventListener('submit', (e) => {
     e.preventDefault()
     weatherResponse.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                weatherResponse.textContent = data.error
            }else{
                weatherResponse.textContent = data.forecastData + data.place
            }
        })
    })
})