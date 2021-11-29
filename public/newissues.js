
// this file is responsible for the front-end of new.hbs 

//grabbing the relevant html elements from new.hbs
const ageslider= document.querySelector('#age-slider') 
const agevalue = document.querySelector('#age-value')
const priceslider= document.querySelector('#price-slider')
const pricevalue = document.querySelector('#price-value')

//lines 10-18 are responsible for rendering a dynamic value which changes in accordance to the movement of the slider(s).
agevalue.textContent = ageslider.value 
ageslider.oninput = function() {
    agevalue.textContent = parseInt(this.value) //converting the content to integer
}

pricevalue.textContent = priceslider.value
priceslider.oninput = function() {
    pricevalue.textContent = parseInt(this.value)
}

//Geolocation 
let lat; //latitude
let lon; //longitude

if (navigator.geolocation) {
  console.log('Geolocation API supported!')
  navigator.geolocation.getCurrentPosition(onSuccess, onError)
} 

function onSuccess(position) {
  lat = position.coords.latitude
  lon = position.coords.longitude
  document.querySelector('#lat').value = lat //set the values of the hidden fields to long and lat
  document.querySelector('#lon').value = lon
  console.log(document.querySelector('#lat').value)
  console.log(document.querySelector('#lon').value)
}
function onError(error) {
  console.log(error.message)
}