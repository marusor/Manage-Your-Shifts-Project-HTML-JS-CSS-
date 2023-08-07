// Login
const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
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

// login to match registration LS

function loginFunction() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var result = document.getElementById("result");
  var storage = [];
  var savedStorage = localStorage.getItem("ApplicationStorage");
  var data = JSON.parse(savedStorage);

  if (savedStorage) {
    storage = JSON.parse(savedStorage);
  }

  for (let data of storage) {
    if (data.username == username) {
      if (data.password == password) {
        var loggedUser = {
          username: "",
          password: "",
        };
        loggedUser.username = data.username;
        loggedUser.password = data.password;
        localStorage.setItem("LoggedUser", JSON.stringify(loggedUser));
        localStorage.setItem(
          "LoggingTime",
          JSON.stringify(new Date().getTime())
        );
        window.location.href = "../Homepage/homepage.html";

        return;
      } else result.innerHTML = "Incorrect login information";
    }
  }
  if (result.innerHTML == "") {
    result.innerHTML = "Account doesn't exist";
    return;
  }
}

// Reset password show/hide div

document.getElementById("resetp").addEventListener("click", function (e) {
  resetPass();
});
function resetPass() {
  document.getElementById("resetpasswindow").style.display = "inline-block";
  document.getElementById("overlay").style.visibility = "visible";
}

document.getElementById("hide").addEventListener("click", function (e) {
  hide();
});
function hide() {
  document.getElementById("resetpasswindow").style.display = "none";
  document.getElementById("overlay").style.visibility = "hidden";
}

// delete all data
document.getElementById("delete").addEventListener("click", function (e) {
  document.getElementById("success-message").style.opacity = "1";
  document.getElementById("resetpasswindow").style.display = "none";
  document.getElementById("overlay").style.visibility = "hidden";
  deleteUsername();
});

function deleteUsername() {
  let enterusername = document.getElementById("enterusername").value;
  let savedStorage = JSON.parse(localStorage.getItem("ApplicationStorage"));

  for (let user of savedStorage) {
    if (enterusername == user.username) {
      Object.getOwnPropertyNames(user).forEach(function (prop) {
        delete user[prop];
      });

      localStorage.setItem("ApplicationStorage", JSON.stringify(savedStorage));
      setTimeout(delaypage, 2000);
      function delaypage() {
        window.location.href = "../registration/Registration.html";
      }
    }
  }
}
