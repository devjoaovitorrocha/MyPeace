document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

  
    var username = document.getElementById("Email");
    var password = document.getElementById("senha");

    if (username === "" || password === "") {
        document.getElementById("error-message").textContent = "Please enter username and password";
    } else {
    
        document.getElementById("error-message").textContent = "";
        alert("Login successful! Welcome, " + username + "!");
        window.location.href = "http://pt.stackoverflow.com";
        
    }
    
});
