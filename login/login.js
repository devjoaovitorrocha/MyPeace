
function login(){

    const email = document.getElementById('username').value
    const password = document.getElementById('password').value

    const data = {
        "email": email,
        "password": password
     };

    fetch("http://localhost:3333/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.message == 'user logged'){
            if(data.type == 'psychologist'){
                window.location.href = '/interfacePsicologo/interfacePsicologo.html'
            }else{
                window.location.href = '/interfacePaciente/interfacePaciente.html'
            }
        }else{
            console.log(data.message)
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}