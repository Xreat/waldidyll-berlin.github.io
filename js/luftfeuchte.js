function calc(t,phi) {
	var T = parseInt(t) + 273.15;
	var esat = 611.2 * Math.exp(17.62*t/(243.12+parseInt(t)));
	var e = phi * esat;
	var R = 461.51;
	var result = e/(R*T);
	document.write = (result*1000).toFixed(2) + " g/m<sup>3</sup>";
}