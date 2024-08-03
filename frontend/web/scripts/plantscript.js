let waterlevel = document.getElementById("waterlvl");
let waterrating = document.getElementById("waterrating");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let temprating = document.getElementById("temprating");

let tempicon = document.getElementById("tempimg");
let watericon = document.getElementById("plantimg");
let droplet = document.getElementById("droplet");
let thermometer = document.getElementById("thermometer");

let levelreq = new XMLHttpRequest();
levelreq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       waterlevel.innerHTML = `ADC Water Level: ${levelreq.responseText}`;
       levelreqglobal = parseInt(levelreq.responseText)*2.5;
    }
};
levelreq.open("GET", `${window.location.href.toString().split("kensplants")[0]}bypassmixed/214/getlevelnumeric`, true);
levelreq.send();

let ratereq = new XMLHttpRequest();
ratereq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       waterrating.innerHTML = `ADC Water Rating: ${ratereq.responseText}`;
       watericon.src = `res/img/plantimages/${ratereq.responseText.toString().toLowerCase()}.png`;
       waterratingcolor = watermapping.get(ratereq.responseText);
       droplet.src = `res/img/plantimages/${ratereq.responseText.toString().toLowerCase()}.png`;
    }
};
ratereq.open("GET", `${window.location.href.toString().split("kensplants")[0]}bypassmixed/214/getrating`, true);
ratereq.send();

let tempreq = new XMLHttpRequest();
tempreq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        temperature.innerHTML = `DHT11 Temperature : ${tempreq.responseText}°C`;
        tempreqglobal = parseInt(tempreq.responseText)*5;
    }
};
tempreq.open("GET", `${window.location.href.toString().split("kensplants")[0]}bypassmixed/214/gettemperature`, true);
tempreq.send();

let humidreq = new XMLHttpRequest();
humidreq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        humidity.innerHTML = `DHT11 Humidity: ${humidreq.responseText}%`;
    }
};
humidreq.open("GET", `${window.location.href.toString().split("kensplants")[0]}bypassmixed/214/gethumidity`, true);
humidreq.send();

let tempratereq = new XMLHttpRequest();
tempratereq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        temprating.innerHTML = `DHT11 Temperature Rating: ${tempratereq.responseText}`;
        tempicon.src = `res/img/plantimages/${tempratereq.responseText.toString().toLowerCase()}.png`
        thermometer.src = `res/img/plantimages/${tempratereq.responseText.toString().toLowerCase()}.png`
        tempratingcolor = tempmapping.get(tempratereq.responseText.toString().toLowerCase());
    }
};
tempratereq.open("GET", `${window.location.href.toString().split("kensplants")[0]}bypassmixed/214/gettemprating`, true);
tempratereq.send();
