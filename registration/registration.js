// Registration Check

const form = document.getElementById("button");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const age = document.getElementById("age");

// if valid send to homepage

form.addEventListener("click", (e) => {
  checkInputs();
  pageIsValid();
});

function pageIsValid() {
  let valid = document.querySelectorAll(".form-control.error");
  if (valid.length == 0) {
    registerFunction();
    document.getElementById("registrationsuccess").style.opacity = "1";

    setTimeout(delaypage, 2500);
    function delaypage() {
      window.location.href = "../login/login.html";
    }
  }
}

// set error/success messages

function checkInputs() {
  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));

  var storage = [];

  var emailEr = document.getElementById("email").value;
  var usernameEr = document.getElementById("username").value;

  if (data) {
    for (let user of data) {
      if (user.email == emailEr) {
        storage.push(emailEr);
      }
      if (user.username == usernameEr) {
        storage.push(usernameEr);
      }
    }
  }

  const usernameCheck = username.value.trim();
  const emailCheck = email.value.trim();
  const passwordCheck = password.value.trim();
  const password2Check = password2.value.trim();
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
  } else if (storage.includes(usernameEr)) {
    setErrorFor(username, "This username is already registered");
  } else {
    setSuccessFor(username);
  }

  if (emailCheck === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailCheck)) {
    setErrorFor(email, "Email is not Valid");
  } else if (storage.includes(emailEr)) {
    setErrorFor(email, "This email address is already registered");
  } else {
    setSuccessFor(email);
  }
  if (passwordCheck === "") {
    setErrorFor(password, "Password cannot be blank");
  } else if (!passwordMust(passwordCheck)) {
    setErrorFor(password, "Password must be at least 6 characters long");
  } else {
    setSuccessFor(password);
  }
  if (password2Check === "") {
    setErrorFor(password2, "Password cannot be blank");
  } else if (passwordCheck !== password2Check) {
    setErrorFor(password2, "Password does not match");
  } else {
    setSuccessFor(password2);
  }
  if (lastNameCheck === "") {
    setErrorFor(lastName, "Last Name cannot be blank");
  } else if (!firstlast(lastNameCheck)) {
    setErrorFor(lastName, "Only letters and at least 2 characters long");
  } else {
    setSuccessFor(lastName);
  }
  if (firstNameCheck === "") {
    setErrorFor(firstName, "First Name cannot be blank");
  } else if (!firstlast(firstNameCheck)) {
    setErrorFor(firstName, "Only letters and at least 2 characters long");
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

// error/success mesages

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
function firstlast(firstName, lastName) {
  return /^[A-Za-z]{2,}$/.test(firstName, lastName);
}
function passwordMust(password) {
  return /^[a-zA-Z0-9-.]{6,}$/.test(password);
}
//   show/hide password and change icon
const pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password");

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

// Registration Local storage
function registerFunction() {
  var savedStorage = localStorage.getItem("ApplicationStorage");

  var storage = [];
  if (savedStorage) {
    storage = JSON.parse(savedStorage);
  }

  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  var age = document.getElementById("age").value;

  // for (let user of storage) {
  // }

  var user = {
    shifts: [],
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
  };

  user.email = email;
  user.username = username;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;
  user.age = age;
  storage.push(user);
  var json = JSON.stringify(storage);
  localStorage.setItem("ApplicationStorage", json);
  localStorage.setItem("My_Shifts", json);
}

const container = document.querySelector(".container");

// signUp.addEventListener("click", () => {
//   container.classList.add("active");
// });
// login.addEventListener("click", () => {
//   container.classList.remove("active");
// });

// 60 minutes LS

// var localStorageEx = {
//   get: function (key) {
//       var value = localStorage[key];
//       if (value != null) {
//           var model = JSON.parse(value);
//           if (model.payload != null && model.expiry != null) {
//               var now = new Date();
//               if (now > Date.parse(model.expiry)) {
//                   localStorage.removeItem(key);
//                   return null;
//               }
//           }
//           return JSON.parse(value).payload;
//       }
//       return null;
//   },
//   set: function (key, value, expirySeconds) {
//       var expiryDate = new Date();
//       expiryDate.setSeconds(expiryDate.getSeconds() + expirySeconds);
//       localStorage[key] = JSON.stringify({
//           payload: value,
//           expiry: expiryDate
//       });
//   }
// };
