function login() {
	var txt = document.getElementById("pass").value;
	if (txt.length > 0) {
		if (md5(txt) === "e2a63c577c8cec80939ee270ca9d6555") {
			document.getElementById("success").style.display = "block";
			document.getElementById("hidden").style.display = "block";
			document.getElementById("login").style.display = "none";
		}
		else {
			document.getElementById("invalidPass").style.display = "block";
		}
	}
}