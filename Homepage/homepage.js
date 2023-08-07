// Auto logout

// This is set for 6 minutes - change hours from 0.1 to 1 for 60 minutes

function autoLogout() {
  const hours = 1;
  const now = new Date().getTime();
  const autologout = localStorage.getItem("LoggingTime");
  if (now - autologout > hours * 60 * 60 * 1000) {
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("logoutdiv").style.visibility = "visible";
    document.getElementById("noscroll").style.overflow = "hidden";
  }
}

let goBack = document.getElementById("logoutbtn");
goBack.addEventListener("click", goBackToLogin);
function goBackToLogin() {
  localStorage.removeItem("LoggingTime");
  localStorage.removeItem("LoggedUser");
  window.location.href = "../login/login.html";
}

// Logout function

let logout2 = document.getElementById("logout2");
logout2.addEventListener("click", function (e) {
  logoutLS2();
});
function logoutLS2() {
  localStorage.removeItem("LoggedUser");
  localStorage.removeItem("LoggingTime");
}
let logout = document.getElementById("logout");
logout.addEventListener("click", function (e) {
  logoutLS();
});
function logoutLS() {
  localStorage.removeItem("LoggedUser");
  localStorage.removeItem("LoggingTime");
}

// on load table details from LS

var loggedUser = JSON.parse(localStorage.getItem("LoggedUser")).username;
var applicationStorage = JSON.parse(localStorage.getItem("ApplicationStorage"));
window.addEventListener("load", () => {
  displayBestMonth();
  setTimeout(autoLogout, 1000);

  loadTable(loggedUser, applicationStorage);
  selectedRow();
});

// Table on load and table on search

function loadTable(loggedUser, applicationStorage) {
  for (let user of applicationStorage) {
    if (user.username == loggedUser) {
      for (let shift of user.shifts) {
        if (shift.location) {
          var newRow = display.insertRow(row);

          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          var cell4 = newRow.insertCell(3);
          var cell5 = newRow.insertCell(4);
          var cell6 = newRow.insertCell(5);
          var cell7 = newRow.insertCell(6);

          cell1.innerHTML = shift.date;
          cell2.innerHTML = shift.start;
          cell3.innerHTML = shift.end;
          cell4.innerHTML = "x" + shift.wage;
          cell5.innerHTML = shift.location;
          cell6.innerHTML = "$" + shift.wageHour * 10;
          cell7.innerHTML = edit.innerHTML;
          cell7.style.cursor = "pointer";
          cell7.style.display = "inline-block";
          cell7.addEventListener("click", () => {
            if (showhide.style.visibility === "visible") {
              showhide.style.visibility = "visible";
            } else {
              showhide.style.visibility = "visible";
            }
          });
        }
      }

      //
      //
    }
  }
}

// Delete Tables not Searched

function clearTable() {
  autoLogout();
  let cleartable = document.getElementById("display");

  let rows = cleartable.rows;

  for (let i = 0; i < rows.length; i++) {
    if (i > 0) {
      rows[i].innerHTML = "";
    }
  }
}

//  show/hide plus div

let plus = document.getElementById("plus");
let showhide = document.getElementById("container-wrapper");

plus.addEventListener("click", () => {
  autoLogout();
  if (showhide.style.visibility === "visible") {
    showhide.style.visibility = "hidden";
  } else {
    showhide.style.visibility = "visible";
  }
});
var entry = document.getElementById("entry");
var loggedUser = JSON.parse(localStorage.getItem("LoggedUser")).username;

var applicationStorage = JSON.parse(localStorage.getItem("ApplicationStorage"));

window.addEventListener("load", () => {
  for (let user of applicationStorage) {
    if ((user.username = loggedUser)) {
      document.getElementById("hellousername").value = user.firstName;
    }
  }
});

// Display details in table

entry.addEventListener("click", displayDetails);

var row = 1;

function displayDetails() {
  autoLogout();

  JSON.parse(window.localStorage.getItem("LoggedUser")).firstName =
    document.getElementById("hellousername").value;

  var nickname = document.getElementById("nickname");
  var comments = document.getElementById("comments");
  var date = document.getElementById("date").value;
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var location = document.getElementById("location").value;
  var wage = document.getElementById("wage").value;
  var edit = document.getElementById("edit");

  // Successfull/Error messages with hidden div

  if (start > end) {
    document.getElementById("success-message").style.opacity = "1";
    document.getElementById("success-message").innerText =
      "End Date cannot be before Start Date";
    document.getElementById("success-message").style.textAlign = "center";
    document.getElementById("success-message").style.fontSize = "1.5rem";
    document.getElementById("success-message").style.color = "white";
    document.getElementById("success-message").style.zIndex = "101";
    setTimeout(function () {
      document.getElementById("success-message").style.opacity = "0";
      document.getElementById("success-message").style.zIndex = "0";
    }, 2500);
    return;
  } else if (!end || !start || !date || !location || !wage) {
    document.getElementById("success-message").style.opacity = "1";
    document.getElementById("success-message").innerText =
      "All fields must be completed";
    document.getElementById("success-message").style.textAlign = "center";
    document.getElementById("success-message").style.fontSize = "1.5rem";
    document.getElementById("success-message").style.color = "white";
    document.getElementById("success-message").style.zIndex = "101";
    setTimeout(function () {
      document.getElementById("success-message").style.opacity = "0";
      document.getElementById("success-message").style.zIndex = "0";
    }, 2500);
    return;
  } else document.getElementById("success-message").style.opacity = "1";
  document.getElementById("success-message").innerText =
    "Shift added successfully";
  document.getElementById("success-message").style.textAlign = "center";
  document.getElementById("success-message").style.fontSize = "1.5rem";
  document.getElementById("success-message").style.color = "white";
  document.getElementById("success-message").style.backgroundColor = "#2ecc71";
  document.getElementById("success-message").style.zIndex = "101";
  setTimeout(function () {
    document.getElementById("success-message").style.opacity = "0";
    document.getElementById("success-message").style.zIndex = "0";
  }, 1500);

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

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);

  let showhide = document.getElementById("container-wrapper");

  cell1.innerHTML = finalDate;
  cell2.innerHTML = start;
  cell3.innerHTML = end;
  cell4.innerHTML = "x" + wage;
  cell5.innerHTML = location;
  cell6.innerHTML = "$" + wageHour * 10;
  cell7.innerHTML = edit.innerHTML;
  cell7.style.cursor = "pointer";
  cell7.style.display = "inline-block";
  cell7.addEventListener("click", () => {
    if (showhide.style.visibility === "visible") {
      showhide.style.visibility = "hidden";
    } else {
      showhide.style.visibility = "visible";
    }
  });
  row++;
  myShiftStorage();
  displayBestMonth();
  selectedRow();
}

// adding to LS

function myShiftStorage() {
  var nickname = document.getElementById("nickname");
  var comments = document.getElementById("comments");
  var date = document.getElementById("date").value;
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var location = document.getElementById("location").value;
  var wage = document.getElementById("wage").value;

  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

  var [year, month, day] = date.split("-");
  var finalDate = [day, month, year].join("/");
  var a = [month];

  var startArr = start.split(":");
  var startMin = parseInt(startArr[0]) * 60 + parseInt(startArr[1]);
  var endArr = end.split(":");
  var endMin = parseInt(endArr[0]) * 60 + parseInt(endArr[1]);
  var totalMinutes = endMin - startMin;
  var totalTime = Math.floor((100 * totalMinutes) / 60) / 100;

  var wageHour = wage * totalTime;

  for (let user of data) {
    if (user.username === loggedUser.username) {
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

JSON.parse(window.localStorage.getItem("LoggedUser")).firstName =
  document.getElementById("hellousername").value;

// on load

// Search Button

searchBtn = document.getElementById("search");

searchBtn.addEventListener("input", searchFunction);

function searchFunction() {
  clearTable();
  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

  // let search = document.getElementById("search").value;

  let searchQuery = searchBtn.value.toLowerCase();
  for (let user of data) {
    if (user.username === loggedUser.username) {
      for (let shift of user.shifts) {
        if (
          typeof shift.location === "string" &&
          shift.location.toLowerCase().includes(searchQuery)
        ) {
          continue;
        } else if (
          typeof shift.date === "string" &&
          shift.date.toLowerCase().includes(searchQuery)
        ) {
          continue;
        } else {
          Object.getOwnPropertyNames(shift).forEach(function (prop) {
            delete shift[prop];
          });
        }
      }
    }
  }
  loadTable(loggedUser.username, data);
}

// display Best Month
// add to displayDetails function

function displayBestMonth() {
  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

  let firstMonth = document.getElementById("firstmonth");

  let monthArr = [];
  let totalWage = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };

  for (let user of data) {
    if (user.username === loggedUser.username) {
      for (let shift of user.shifts) {
        let monthObj = {
          month: "",
          wage: "",
        };
        var startArr = shift.start.split(":");
        var startMin = parseInt(startArr[0]) * 60 + parseInt(startArr[1]);
        var endArr = shift.end.split(":");
        var endMin = parseInt(endArr[0]) * 60 + parseInt(endArr[1]);
        var totalMinutes = endMin - startMin;
        var totalTime = Math.floor((100 * totalMinutes) / 60) / 100;

        var wageHour = shift.wage * totalTime * 10;
        let [year, month, day] = shift.date.split("/");
        let finalMonth = [day, month, year];
        if (finalMonth[1].charAt(0) == "0") {
          finalMonth[1] = finalMonth[1].charAt(1);
        }
        let month1 = finalMonth[1];

        monthObj.month = month1;
        monthObj.wage = wageHour;

        monthArr.push(monthObj);
      }
    }
  }
  for (let elements of monthArr) {
    totalWage[elements.month] += elements.wage;
  }

  let values = Object.values(totalWage);

  values.sort((a, b) => {
    return a - b;
  });

  let bestMonth = values[values.length - 1];
  Object.prototype.getKey = function (value) {
    var object = this;
    for (var key in object) {
      if (object[key] == value) return key;
    }
  };
  let a = toMonthName(totalWage.getKey(bestMonth));

  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }
  if (bestMonth == 0) {
  } else {
    firstMonth.value = a + " " + "$" + bestMonth;
  }
}

// Edit button

var rIndex,
  table = document.getElementById("display");

function selectedRow() {
  for (let i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      rIndex = this.rowIndex;
      document.getElementById("date").value = this.cells[0].innerHTML
        .split("/")
        .join(":");
      document.getElementById("start").value = this.cells[1].innerHTML;
      document.getElementById("end").value = this.cells[2].innerHTML;
      document.getElementById("wage").value = this.cells[3].innerHTML;

      console.log(this.cells[3].innerHTML);
      document.getElementById("location").value = this.cells[4].innerHTML;

      this.classList.toggle("selected");
    };
  }
}
let editBtn = document.getElementById("editBtn");
editBtn.addEventListener("click", editTableRow);

function editTableRow() {
  autoLogout();
  let date = document.getElementById("date").value;
  let start = document.getElementById("start").value;
  let end = document.getElementById("end").value;
  let location = document.getElementById("location").value;
  let wage = document.getElementById("wage").value;

  var [year, month, day] = date.split("-");
  var finalDate = [day, month, year].join("/");

  var startArr = start.split(":");
  var startMin = parseInt(startArr[0]) * 60 + parseInt(startArr[1]);
  var endArr = end.split(":");
  var endMin = parseInt(endArr[0]) * 60 + parseInt(endArr[1]);
  var totalMinutes = endMin - startMin;
  var totalTime = Math.floor((100 * totalMinutes) / 60) / 100;

  var wageHour = wage * totalTime * 10;

  // Successfull/Error messages with hidden div

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
  } else if (!end || !start || !date || !location || !wage) {
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
  } else if (wage.value == "0" || location.value == "0") {
    document.getElementById("success-message").innerText =
      "Choose a valid selection!";
  } else document.getElementById("success-message").style.opacity = "1";
  document.getElementById("success-message").innerText =
    "Shift update Successfull";
  document.getElementById("success-message").style.textAlign = "center";
  document.getElementById("success-message").style.fontSize = "1.5rem";
  document.getElementById("success-message").style.color = "white";
  document.getElementById("success-message").style.backgroundColor = "#2ecc71";
  setTimeout(function () {
    document.getElementById("success-message").style.opacity = "0";
  }, 1500);

  table.rows[rIndex].cells[0].innerHTML = finalDate;
  table.rows[rIndex].cells[1].innerHTML = start;
  table.rows[rIndex].cells[2].innerHTML = end;
  table.rows[rIndex].cells[3].innerHTML = "x" + wage;
  table.rows[rIndex].cells[4].innerHTML = location;
  table.rows[rIndex].cells[5].innerHTML = "$" + wageHour;

  let data = JSON.parse(localStorage.getItem("ApplicationStorage"));
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

  for (let user of data) {
    if (user.username === loggedUser.username) {
      user.shifts[user.shifts.length - rIndex].date = finalDate;
      user.shifts[user.shifts.length - rIndex].start = start;
      user.shifts[user.shifts.length - rIndex].end = end;
      user.shifts[user.shifts.length - rIndex].wage = wage;
      user.shifts[user.shifts.length - rIndex].location = location;
      user.shifts[user.shifts.length - rIndex].wageHour = wageHour / 10;
      localStorage.setItem("ApplicationStorage", JSON.stringify(data));
    }
  }
  displayBestMonth();
  selectedRow();
}
