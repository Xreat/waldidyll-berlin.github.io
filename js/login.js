function login() {
	var txt = document.getElementById("pass").value;
	if (txt.length > 0) {
		if (txt == "wetter") {
			document.getElementById("success").style.display = "block";
			document.getElementById("hidden").style.display = "block";
			document.getElementById("login").style.display = "none";
		}
		else {
			document.getElementById("invalidPass").style.display = "block";
		}
	}
}