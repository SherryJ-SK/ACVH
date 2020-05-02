var userEmail = document.querySelector("#email");
var password = document.querySelector("#password");
var btn = document.querySelector("#btn");

btn.addEventListener("click", function (event) {
    event.preventDefault();

    console.log("line8");
    console.log(userEmail);
    
    var userData = {
        loginEmail: userEmail.value,
        password: password.value,
    };

    if (!userData.loginEmail || !userData.password) {
        alert("Please enter your login information");
    };

    loginUser(userData.loginEmail, userData.password);
});

function loginUser(email, password) {
    axios.post("/api/auth/login", {
        email: email,
        password: password
    })
        .then(function () {
            window.location.replace("/api/register_login");
        })
        .catch(function (err) {
            console.log(err);
        });
};
