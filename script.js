// DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    day = document.querySelector('.day'),
    focus = document.querySelector('.focus');

// Options
const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
        dayWeek = today.getDay(),
        month = today.getMonth(),
        dayNumb = today.getDate();

    // День
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
            'октября', 'ноября', 'декабря'],
        currentMonth = months[month],
        weekDay = days[dayWeek];

    // // Set AM or PM
    // const amPm = hour >= 12 ? 'PM' : 'AM';
    //
    // // 12hr Format
    // hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
        sec
    )}`;
    day.innerHTML = `${weekDay}<span>,</span> ${dayNumb} ${currentMonth}`;
    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 12) {
        // Morning
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
        greeting.textContent = 'Good Afternoon, ';
    } else {
        // Evening
        document.body.style.backgroundImage =
            "url('https://i.ibb.co/924T2Wv/night.jpg')";
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
    }
}

// Get Name
function getName() {
    name.addEventListener('click', function (){name.textContent = ''});
    let currentName = localStorage.getItem('name');
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
            getName();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
        getName();
    }
}

// Get Focus
function getFocus() {
    focus.addEventListener('click', function (){focus.textContent = ''});
    let currentName = localStorage.getItem('focus');
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {


    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
            getFocus();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
        getFocus();
    }
}

const base = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}
function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewBgImage(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);







name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


// Run
showTime();
setBgGreet();
getName();
getFocus();

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuoute = document.querySelector('.btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked
async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
