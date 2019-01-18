function absHum(t, h) {
	return (6.112 * Math.exp((17.67 * t)/(243.12 + t)) * h * 2.1674)/(t + 273.15);
}

function writeAbsHumidity(t, h) {
	document.write(absHum(t, h).toFixed(1) + " g/m<sup>3</sup>");
}

function openNoaaFile(date){
	var url = "NOAA/NOAA-";
	url = url + date;
	url = url + ".txt";
	if(date.startsWith("2")) {
			window.location=url;
	}
}

function changeRadar() {
	if(document.querySelector("img.radar").src == db["Extras.radar_img"]) {
			document.querySelector("img.radar").src = db["Extras.radar_gif"];
	} else {
			document.querySelector("img.radar").src = db["Extras.radar_img"];
	}
}

function login() {
	let txt = document.querySelector(".login-page input").value;
	if (txt.length > 0) {
		if (md5(txt) === "e2a63c577c8cec80939ee270ca9d6555") {
			document.querySelector(".hidden").className = "";
			document.querySelector(".login-page").style.display = "none";
		}
		else {
			document.querySelector(".login-page .message").style.display = "block";
		}
	}
}

function setGaugeValue(gauge, value) {
	if (value) setInterval( function() { Gauge.Collection.get(gauge).setValue(value)}, 1000);
}

document.addEventListener("DOMContentLoaded", injectData);
const refreshInterval = 300000;
let refresh = window.setInterval(injectData, refreshInterval);

function injectData(event) {
	loadJSON(function(response) {
		// Parse JSON string into object
		let db = JSON.parse(response);
		document.querySelectorAll('*[id]').forEach(e => {
			let id = e.getAttribute("id");
			if (e.tagName === "CANVAS") { setGaugeValue(id, db[e.getAttribute("data-tag")]) }
			else if (db[id]) { e.innerHTML = db[id]; }
		});
		
		let m = document.querySelectorAll("select")[0];
		db["months"].forEach(e => {
			let row = document.createElement('option');
			row.innerHTML = e;
			row.value = e;
			m.appendChild(row);
		});
		let y = document.querySelectorAll("select")[1];
		db["years"].forEach(e => {
			let row = document.createElement('option');
			row.innerHTML = e;
			row.value = e;
			y.appendChild(row);
		});
		
		document.querySelector("input[type=checkbox]").onchange = function(evt) {
			if (evt.target.checked && !refresh) {
				refresh = window.setInterval(injectData, refreshInterval);
			} 
			else if (!evt.target.checked && refresh) {
				window.clearInterval(refresh);
				refresh = 0;
			}
		}
		
		const loc = db["station.location"] || "";
		document.querySelector("header p a").src = "https://www.google.com/maps/?q=" + loc;
		// document.title = loc + " " + document.title;
		document.querySelector("[property='og:site_name']").content = loc;
		document.querySelector("[property='og:description']").content = `Weekly Weather Summary from ${loc} - weather web site powered by weewx`;
		
		if (document.querySelector(".login-page")) {
			document.querySelector(".login-page button").onclick = login;
			document.querySelector(".login-page input").onkeyup = function(evt) {
				if (evt.keyCode === 13) {
					document.querySelector(".login-page button").click();
				}
			}
		}
	});
}

 function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/values.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
