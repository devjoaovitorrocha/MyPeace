function cadastrarPaciente(){

    const name = document.getElementById('nome').value
    const gender = document.getElementById('sexo').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('telefone').value

    const data = { 
        "name": name,
        "gender": gender,
        "email": email,
        "phone": phone
     };

    fetch("http://localhost:3333/auth/registration/pacient", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.msg == 'Pacient registered'){
            alert(data.password)
        }else{
            console.log(data.msg)
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}