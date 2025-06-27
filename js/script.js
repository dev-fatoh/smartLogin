var login = document.querySelector(".login");
var registerBtn = document.querySelector(".register__btn");
var registerForm = document.querySelector(".register");
var loginBtn = document.querySelector(".login__btn");
var signupLink = document.querySelector(".signup__link");
var loginEmail = document.querySelector(".login #email");
var loginPassword = document.querySelector(".login #password");
var loginText = document.querySelector(".login__massage");

signupLink.addEventListener("click", function (e) {
  e.preventDefault();
  login.classList.add("hidden");

  registerForm.classList.remove("hidden");
});

////////////////// sign up /////////////////////////
var userName = document.querySelector(".register #name");
var userEmail = document.querySelector(".register #email");
var userPassword = document.querySelector(".register #password");
var user = {};
var users;
if (localStorage) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

userName.addEventListener("change", function (e) {
  if (e.target.value == "") {
    setError(userName, "required filed");
  } else if (e.target.value.length < 4) {
    setError(userName, "name must be at least 4 letters");
  } else {
    setSuccess(userName);
    user.name = e.target.value;
  }
});

userEmail.addEventListener("change", function (e) {
  if (e.target.value === "") {
    setError(userEmail, "required filed");
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)
  ) {
    setError(userEmail, "not valid email address");
  } else {
    setSuccess(userEmail);
    user.email = e.target.value;
  }
});
userPassword.addEventListener("change", function (e) {
  if (e.target.value === "") {
    setError(userPassword, "required feild");
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value)) {
    setError(
      userPassword,
      "password should be 8 character at least on letter and one number",
    );
  } else {
    setSuccess(userPassword);
    user.password = e.target.value;
  }
});
registerBtn.addEventListener("click", function () {
  if (user.name && user.email && user.password) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    setDefault(userName);
    setDefault(userEmail);
    setDefault(userPassword);
    document.querySelector(".alert").textContent = "you signed up ";
    setTimeout(displayLoginForm, 3000);
    clearInputs();

    user = {};
  }
});

function setError(input, message) {
  var parentElement = input.parentElement;
  var small = parentElement.querySelector("small");
  small.innerText = message;

  parentElement.classList.remove("success");
  parentElement.classList.add("error");
}
function setSuccess(input) {
  var parentElement = input.parentElement;

  parentElement.classList.remove("error");
  parentElement.classList.add("success");
  var small = parentElement.querySelector("small");
  small.innerText = "";
}
function setDefault(input) {
  var parentElement = input.parentElement;

  parentElement.classList.remove("success");
}
function clearInputs() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}
function displayHome(userName) {
  document.querySelector(".container").classList.add("hidden");
  document.querySelector(".userName").classList.remove("hidden");
  document.querySelector(".userName").innerHTML = "welcome " + userName;
}
function displayLoginForm() {
  registerForm.classList.add("hidden");
  login.classList.remove("hidden");

  document.querySelector(".alert").textContent = "";
}
//////////////////log in ////////////////////

// get email and password values from loccalstorage
var valuesOfUsers = [];
function getUsersInfo() {
  for (i = 0; i < users.length; i++) {
    var userValues = Object.values(users[i]);
    for (v = 0; v < userValues.length; v++) {
      valuesOfUsers.push(userValues[v]);
    }
  }
}
getUsersInfo();
var loginUserName;
function validLogin() {
  if (
    valuesOfUsers.includes(loginEmail.value) &&
    valuesOfUsers.includes(loginPassword.value)
  ) {
    loginText.innerHTML = "your are successfully logged in ";

    loginText.style.color = "green";
    loginUserName = valuesOfUsers[valuesOfUsers.indexOf(loginEmail.value) - 1];
    setTimeout(function () {
      displayHome(loginUserName);
    }, 3000);

    loginEmail.value = "";

    loginPassword.value = "";
  } else {
    loginText.innerHTML = "failed to login plaese try again ";
    loginText.style.color = "red";
  }
}

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  validLogin();
});
