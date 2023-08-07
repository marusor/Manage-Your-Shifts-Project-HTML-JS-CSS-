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

window.addEventListener("load", () => {
  localStorage.getItem("LoggingTime");
  autoLogout();
});

// display Table

var entry = document.getElementById("entry");

var row = 1;

entry.addEventListener("click", displayDetails);

function displayDetails() {
  autoLogout();
  loadingCircle();

  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

  var nickname = document.getElementById("nickname").value;
  var comments = document.getElementById("comments").value;
  var date = document.getElementById("date").value;
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var location = document.getElementById("location").value;
  var wage = document.getElementById("wage").value;

  var shiftsnickname = [];
  for (let user of data) {
    if (user.username == loggedUser.username) {
      for (let shift of user.shifts) {
        shiftsnickname.push(shift.nickname);
      }
    }
  }

  if (start > end) {
    document.getElementById("success-message").style.opacity = "1";
    document.getElementById("success-message").innerText =
      "End Date cannot be before Start Date";
    document.getElementById("success-message").style.textAlign = "center";
    document.getElementById("success-message").style.fontSize = "1.5rem";
    document.getElementById("success-message").style.color = "white";
    setTimeout(function () {
      document.getElementById("success-message").style.opacity = "0";
    }, 2500);
    return;
  } else if (!end || !start || !nickname || !date || !location || !wage) {
    document.getElementById("success-message").style.opacity = "1";
    document.getElementById("success-message").innerText =
      "All fields must be completed";
    document.getElementById("success-message").style.textAlign = "center";
    document.getElementById("success-message").style.fontSize = "1.5rem";
    document.getElementById("success-message").style.color = "white";
    setTimeout(function () {
      document.getElementById("success-message").style.opacity = "0";
    }, 2500);
    return;
  } else if (shiftsnickname.includes(nickname)) {
    document.getElementById("success-message").style.opacity = "1";
    document.getElementById("success-message").innerText =
      "This ID already exists";
    document.getElementById("success-message").style.textAlign = "center";
    document.getElementById("success-message").style.fontSize = "1.5rem";
    document.getElementById("success-message").style.color = "white";
    setTimeout(function () {
      document.getElementById("success-message").style.opacity = "0";
    }, 2500);
    return;
  } else {
    showingCircle();
    document.getElementById("success-message").style.opacity = "1";
    document.getElementById("success-message").innerText =
      "Shift added successfully";
    document.getElementById("success-message").style.textAlign = "center";
    document.getElementById("success-message").style.fontSize = "1.5rem";
    document.getElementById("success-message").style.color = "white";
    document.getElementById("success-message").style.backgroundColor =
      "#2ecc71";
    setTimeout(function () {
      document.getElementById("success-message").style.opacity = "0";
    }, 1500);
  }

  for (let user of data) {
  }

  var [year, month, day] = date.split("-");
  var finalDate = [day, month, year].join("/");

  var startArr = start.split(":");
  var startMin = parseInt(startArr[0]) * 60 + parseInt(startArr[1]);
  var endArr = end.split(":");
  var endMin = parseInt(endArr[0]) * 60 + parseInt(endArr[1]);
  var totalMinutes = endMin - startMin;
  var totalTime = Math.floor((100 * totalMinutes) / 60) / 100;

  var display = document.getElementById("display");
  var wageHour = wage * totalTime;
  var newRow = display.insertRow(row);

  // Delay to match loading circle

  setTimeout(delayShow, 1250);

  function delayShow() {
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    cell1.innerHTML = finalDate;
    cell2.innerHTML = start;
    cell3.innerHTML = end;
    cell4.innerHTML = "x" + wage;
    cell5.innerHTML = location;
    cell6.innerHTML = nickname;
    cell7.innerHTML = comments;
  }

  row++;
  myShiftStorage();
}

// Adding table details to localStorage

function myShiftStorage() {
  var nickname = document.getElementById("nickname").value;
  var comments = document.getElementById("comments").value;
  var date = document.getElementById("date").value;
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var location = document.getElementById("location").value;
  var wage = document.getElementById("wage").value;

  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  var [year, month, day] = date.split("-");
  var finalDate = [day, month, year].join("/");

  var startArr = start.split(":");
  var startMin = parseInt(startArr[0]) * 60 + parseInt(startArr[1]);
  var endArr = end.split(":");
  var endMin = parseInt(endArr[0]) * 60 + parseInt(endArr[1]);
  var totalMinutes = endMin - startMin;
  var totalTime = Math.floor((100 * totalMinutes) / 60) / 100;

  var display = document.getElementById("display");
  var wageHour = wage * totalTime;

  for (let user of data) {
    if (user.username === loggedUser.username) {
      console.log("Suntem logati");
      let shiftsArr = [];

      shiftsArr = user.shifts;
      let shift = {
        date: "",
        nickname: "",
        comments: "",
        start: "",
        end: "",
        location: "",
        wage: "",
        wageHour: "",
      };

      shift.date = finalDate;
      shift.nickname = nickname;
      shift.comments = comments;
      shift.start = start;
      shift.end = end;
      shift.location = location;
      shift.wage = wage;
      shift.wageHour = wageHour;
      shiftsArr.push(shift);
      user.shifts = shiftsArr;
      localStorage.setItem("ApplicationStorage", JSON.stringify(data));
    }
  }
}

// Loading circle and showing when clicked

function showingCircle() {
  document.getElementById("loading-container").style.visibility = "visible";
}

function loadingCircle() {
  let loading = document.querySelector(".loading");
  let progressValue = document.querySelector(".progress");

  let progressStart = 0,
    progressEnd = 100,
    speed = 12.5;

  let progress = setInterval(() => {
    progressStart++;

    progressValue.textContent = `${progressStart}%`;
    loading.style.background = `conic-gradient(rgba(0, 212, 255, 1) ${
      progressStart * 3.6
    }deg, #ededed 0deg)`;
    if (progressStart == progressEnd) {
      document.getElementById("loading-container").style.visibility = "hidden";
      clearInterval(progress);
    }
  }, speed);
}
