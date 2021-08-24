"use strict";
let myForm = document.getElementById('myForm');
const table = document.getElementById('table');
if (localStorage.getItem("movies") == null) {
    localStorage.setItem("movies", "[]")
}

function FormData(movieName, movieCategory, issueYear) {
    this.movieName = movieName;
    this.movieCategory = movieCategory;
    this.issueYear = issueYear;
    FormData.all.push(this);
}
FormData.prototype.render = function() {
    let row = document.createElement("tr");
    table.appendChild(row);
    let tdElement0 = document.createElement("td");
    tdElement0.textContent = "X";
    row.appendChild(tdElement0);
    let tdElement1 = document.createElement("td");
    let imgIcon = document.createElement("img");
    imgIcon.setAttribute("src", "./img/" + this.movieCategory + ".png")
    tdElement1.appendChild(imgIcon);
    row.appendChild(tdElement1);
    let tdElement2 = document.createElement("td");
    tdElement2.textContent = this.movieName;
    row.appendChild(tdElement2);
    let tdElement3 = document.createElement("td");
    tdElement3.textContent = this.issueYear;
    row.appendChild(tdElement3);
};
FormData.all = [];
let moviesOldData = JSON.parse(localStorage.getItem("movies"))
console.log(moviesOldData);
for (let i = 0; i < moviesOldData.length; i++) {
    new FormData(moviesOldData[i].movieName, moviesOldData[i].movieCategory, moviesOldData[i].issueYear).render();
}


myForm.addEventListener("submit", logSubmit)

function logSubmit(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let img = document.getElementById("img").value;
    let date = document.getElementById("release").value;
    let newMovie = new FormData(name, img, date);
    console.log(newMovie);
    localStorageFunction(newMovie)
    newMovie.render();
}

function localStorageFunction(newData) {
    let oldData = JSON.parse(localStorage.getItem("movies"));
    oldData.push(newData);
    localStorage.movies = JSON.stringify(oldData);
}
let tFooter = document.createElement("tfoot");
let clearBtn = document.createElement("button");
clearBtn.setAttribute("onclick", "clearFunction()");
clearBtn.textContent = "clear this list of movies";
tFooter.appendChild(clearBtn);
table.appendChild(tFooter);

function clearFunction() {
    localStorage.clear();
    location.reload();
}