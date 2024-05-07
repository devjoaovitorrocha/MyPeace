function cadastrar(){

    const name = document.getElementById('username').value
    const cpf = document.getElementById('cpf').value
    const registerNumber = document.getElementById('text').value
    const phone = document.getElementById('tel').value
    const email = document.getElementById('email').value
    const password = document.getElementById('senha').value
    const confirmPassword = document.getElementById('confSenha').value

    const data = { 
        "name": name,
        "cpf": cpf,
        "registerNumber": registerNumber,
        "phone": phone,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword
     };

    fetch("http://localhost:3333/auth/registration/psychologist", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.msg == 'Psychologist registered'){
            window.location.href = '/login/login.html'
        }else{
            console.log(data.msg)
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}