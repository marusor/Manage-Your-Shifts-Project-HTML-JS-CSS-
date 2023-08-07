// Auto logout

// This is set for 6 minutes - change hours from 0.1 to 1 for 60 minutes

function autoLogout() {
  const hours = 1;
  const now = new Date().getTime();
  const autologout = localStorage.getItem("LoggingTime");
  if (now - autologout > hours * 60 * 60 * 1000) {
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("logoutdiv").style.visibility = "visible";
  }
}

let goBack = document.getElementById("logoutbtn");
goBack.addEventListener("click", goBackToLogin);
function goBackToLogin() {
  localStorage.removeItem("LoggingTime");
  localStorage.removeItem("LoggedUser");
  window.location.href = "../login/login.html";
}

const form = document.getElementById("button");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const age = document.getElementById("age");

// Loading details

const loggedUser = JSON.parse(localStorage.getItem("LoggedUser")).username;
const applicationStorage = JSON.parse(
  localStorage.getItem("ApplicationStorage")
);
window.addEventListener("load", () => {
  localStorage.getItem("LoggingTime");
  autoLogout();
  for (let user of applicationStorage) {
    if (user.username == loggedUser) {
      document.getElementById("email").value = user.email;
      document.getElementById("username").value = user.username;
      document.getElementById("password").value = user.password;
      document.getElementById("fname").value = user.firstName;
      document.getElementById("lname").value = user.lastName;
      document.getElementById("age").value = user.age;
    }
  }
});

form.addEventListener("click", () => {
  autoLogout();
  checkInputs();
  pageIsValid();
});

// Verifying details

function pageIsValid() {
  let valid = document.querySelectorAll(".form-control.error");
  if (valid.length == 0) {
    let loggedUsername = JSON.parse(localStorage.getItem("LoggedUser"));
    for (let user of applicationStorage) {
      if (user.username == loggedUser) {
        loggedUsername.username = document.getElementById("username").value;
        loggedUsername.password = document.getElementById("password").value;
        user.email = document.getElementById("email").value;
        user.username = document.getElementById("username").value;
        user.password = document.getElementById("password").value;
        user.firstName = document.getElementById("fname").value;
        user.lastName = document.getElementById("lname").value;
        user.age = document.getElementById("age").value;
        document.getElementById("success-message").style.opacity = "1";
        setTimeout(delayPage, 2000);
        function delayPage() {
          window.location.href = "../Homepage/homepage.html";
        }
      }
    }
    localStorage.setItem("LoggedUser", JSON.stringify(loggedUsername));
    localStorage.setItem(
      "ApplicationStorage",
      JSON.stringify(applicationStorage)
    );
  }
}

// Check if input data is correct

function checkInputs() {
  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));

  var storage = [];

  var emailEr = document.getElementById("email").value;
  var usernameEr = document.getElementById("username").value;

  for (let user of data) {
    if (user.email == emailEr) {
      storage.push(emailEr);
    }
    if (user.username == usernameEr) {
      storage.push(usernameEr);
    }
  }

  const usernameCheck = username.value.trim();
  const emailCheck = email.value.trim();
  const passwordCheck = password.value.trim();
  const firstNameCheck = firstName.value.trim();
  const lastNameCheck = lastName.value.trim();
  const ageCheck = age.value.trim();

  if (usernameCheck === "") {
    setErrorFor(username, "Username cannot be blank");
  } else if (!usernameMust(usernameCheck)) {
    setErrorFor(
      username,
      "Username must contain letters, numbers and a special character"
    );
  }
  // else if (storage.includes(usernameEr)) {
  //   setErrorFor(username, "This username is already registered");
  // }
  else {
    setSuccessFor(username);
  }

  if (emailCheck === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailCheck)) {
    setErrorFor(email, "Email is not Valid");
  }
  // else if (storage.includes(emailEr)) {
  //   setErrorFor(email, "This email address is already registered");
  // }
  else {
    setSuccessFor(email);
  }
  if (passwordCheck === "") {
    setErrorFor(password, "Password cannot be blank");
  } else {
    setSuccessFor(password);
  }

  if (lastNameCheck === "") {
    setErrorFor(lastName, "Last Name cannot be blank");
  } else {
    setSuccessFor(lastName);
  }
  if (firstNameCheck === "") {
    setErrorFor(firstName, "First Name cannot be blank");
  } else {
    setSuccessFor(firstName);
  }
  if (ageCheck === "") {
    setErrorFor(age, "Age cannot be blank");
  } else if (ageCheck < 18) {
    setErrorFor(age, "You must be over 18");
  } else if (ageCheck > 65) {
    setErrorFor(age, "You should retire");
  } else if (/^[A-Za-z]+$/.test(ageCheck)) {
    setErrorFor(age, "It cannot contain letters");
  } else {
    setSuccessFor(age);
  }
}

// Error/success messages

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
}
function usernameMust(username) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    username
  );
}

// show/hide function
const pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password");

//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});
