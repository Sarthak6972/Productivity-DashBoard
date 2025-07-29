function openFeatures(){
    var allElems=document.querySelectorAll('.elem')
var fullElems=document.querySelectorAll('.fullElem')
var fullElemsback=document.querySelectorAll('.back')

allElems.forEach(function(e){
    e.addEventListener("click",function(){
        // console.log(e.id);

        fullElems[e.id].style.display = 'block'
    })
})

fullElemsback.forEach(function(e){
    e.addEventListener("click",function(){
        fullElems[e.id].style.display = 'none'
    })
})
}
openFeatures();

let form = document.querySelector('.addtask form')
let taskinput = document.querySelector(".addtask form input#task-input")
let taskDetailsInput = document.querySelector(".addtask form textarea")
let taskCheckbox = document.querySelector('.addtask form #check')

var currenttask = [
    // these are just examples to follow
    // {
    //     task:'mandir jao',
    //     details:'hanumanji waale',
    //     imp:true
    // },
    // {
    //     task:'Recording karo',
    //     details:'cohort ke liye',
    //     imp:true
    // },
    // {
    //     task:'lunch at 2PM',
    //     details:'Nahi to mummy datengi',
    //     imp:false
    // }
]

if(localStorage.getItem('currenttask')){
    currenttask = JSON.parse(localStorage.getItem('currenttask'));
}
else{
    console.log('task list is empty')
   localStorage.setItem('currenttask',currenttask)
}

function renderTask() {
    var allTask = document.querySelector('.allTask')

    var sum = ''

    currenttask.forEach(function(elem,idx){
        sum = sum + `<div class="task">
                            <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
                            <button id="${idx}">Mark as Completed</button>
                        </div>`
    })

    allTask.innerHTML = sum
    localStorage.setItem('currenttask',JSON.stringify(currenttask))


        var markCompleted = document.querySelectorAll('.task button')

        markCompleted.forEach(function(btn){
        btn.addEventListener('click',function(){
            currenttask.splice(btn.id,1);
            renderTask();
        })
    })
}

renderTask()

form.addEventListener("submit",function(e){
    e.preventDefault();
    // console.log(taskinput.value,taskDetailsInput.value);
    // console.log(taskCheckbox.checked);
    currenttask.push(
        {
        task:taskinput.value,details:taskDetailsInput.value,imp:taskCheckbox.checked
        }
    )
    renderTask()
    taskinput.value = ''
    taskDetailsInput.value = ''
    taskCheckbox.checked = false
})

var hours = Array.from({length:18},function(elem,idx){
    return `${6+idx}:00 - ${7+idx}:00`
})

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

var wholeDaySum = ''
hours.forEach(function(elem,idx){

    var savedData = dayPlanData[idx] || ''
    wholeDaySum = wholeDaySum + `<div class="day-planner-time">
                 <p>${elem}</p>
                <input id="${idx}" type="text" placeholder="..." value = "${savedData}">
               </div>`
})


var dayPlanner = document.querySelector('.day-planner')

dayPlanner.innerHTML = wholeDaySum

var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
    elem.addEventListener('input',function(){
        dayPlanData[elem.id] = elem.value

        console.log(dayPlanData);

        localStorage.setItem('dayPlanData' , JSON.stringify(dayPlanData))
    })
})


function motivation(){
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
var motivationquote = document.querySelector('.motivation2 h1')
var motivationauthor = document.querySelector('.author')
async function fetchQuote(){
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'hqMvLbFGxi4/Yunj9xHcdg==yQvgFco1aRUAQ4Hv'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); // This returns an array
        motivationquote.innerHTML = data[0].quote; // Access the quote
        motivationauthor.innerHTML = data[0].author; // Optional: log author
    } catch (error) {
        console.error(error);console.log
    }
}

fetchQuote();
}
motivation();

function pomodoro(){
    let totalseconds  = 25*60

let timer = document.querySelector('.pomo-timer h1')
let strt = document.querySelector('.start-timer')
let pause = document.querySelector('.pause-timer')
let reset = document.querySelector('.reset-timer')
let timeInterval = null;
let worksession = true;
var session = document.querySelector('.pomodoro-fullpage .session')


function upDateTime(){
    let minutes = Math.floor(totalseconds/60);
    let seconds = totalseconds%60;

    timer.innerHTML = `${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`
}

function startTimer(){
    clearInterval(timeInterval)
    
        if(worksession){
            
            totalseconds = 25*60
            timeInterval = setInterval(function(){
                if(totalseconds>0){
                totalseconds--
                upDateTime()
                }
                else{
                timer.innerHTML = '05:00'
                session.innerHTML = 'Break'
                worksession = false;
                clearInterval(timeInterval)
                }
            },1)
        }

        else{
            session.innerHTML = 'Break'
            totalseconds = 5*60
             timeInterval = setInterval(function(){
                if(totalseconds>0){
                totalseconds--
                upDateTime()
                }
                else{
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                worksession = true;
                clearInterval(timeInterval)
                }
            },1)
        }
}


strt.addEventListener('click',startTimer);

function pauseTimer(){
    clearInterval(timeInterval)
}

pause.addEventListener('click',pauseTimer);

function resetTimer(){
    clearInterval(timeInterval);
    totalseconds = 25*60
    upDateTime()
}

reset.addEventListener('click',resetTimer)
}

pomodoro();

const apikey='bcae5902094246b6a2e60549252507'
var data = null

async function weatherAPICall(){
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=Delhi,India`);
    data = await response.json();
    console.log(data.current.temp_c)

    header2temp.innerHTML = `${data.current.temp_c }°c`
    header2Condition.innerHTML = `${data.current.condition.text}`
    Precipitation.innerHTML = `Precepitation: ${data.current.heatindex_c}%`
    humidity.innerHTML = `humidity: ${data.current.humidity}%`
    wind.innerHTML = `wind: ${data.current.wind}%`
}

weatherAPICall()

var date = null

var header1TIME = document.querySelector('.header1 h1')
var header1Date = document.querySelector('.header1 h2')
var header2temp = document.querySelector('.header2 h2')
var precepitation = document.querySelector('.header2 ')

var header2Condition = document.querySelector('.header2 h1')

var Precipitation = document.querySelector('.header2 .Precipitation')

var humidity = document.querySelector('.header2 .humidity')

var wind = document.querySelector('.header2 .wind')


function timeDate(){
    const totaldaysofweek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const totalmonthofyear = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const date = new Date();

    const dayofWeek = totaldaysofweek[date.getDay()];
    let hours = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const tarik = date.getDate();
    const month = totalmonthofyear[date.getMonth()];
    const year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month} ${year}`;  // ✅ space added between each

    let period = "AM";
    if (hours > 12) {
        hours -= 12;
        period = "PM";
    } else if (hours === 0) {
        hours = 12; // Midnight case
    }

    header1TIME.innerHTML = `${dayofWeek}, ${hours}:${String(mins).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`; // ✅ fixed spacing
}

setInterval(function(){
    timeDate();
},1000)

document.addEventListener("DOMContentLoaded", function () {
  const rootElement = document.documentElement;
  const theme = document.querySelector('.theme-toggle');
  const moon = document.querySelector('.moon-icon');
  const img = document.querySelector('.ALLelems header');

  let isDark = 0;

  theme.addEventListener('click', function () {
    console.log("Current isDark value:", isDark);

    if (isDark === 0) {
      // Apply Dark Theme
      rootElement.style.setProperty('--pri', '#526D82');
      rootElement.style.setProperty('--sec', '#222831');
      rootElement.style.setProperty('--tri1', '#948971');
      rootElement.style.setProperty('--tri2', '#9DB2BF');

      moon.classList.remove('ri-moon-line');
      moon.classList.add('ri-sun-line');

      if (img) {
        img.style.backgroundImage = `url('https://images.unsplash.com/photo-1753561881904-37dee26b7a2d?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0')`;
      }

      isDark = 1;
    } else {
      // Apply Light Theme
      rootElement.style.setProperty('--pri', '#F8f4E1');
      rootElement.style.setProperty('--sec', '#472a17');
      rootElement.style.setProperty('--tri1', '#FEBA17');
      rootElement.style.setProperty('--tri2', '#74512D');

      moon.classList.remove('ri-sun-line');
      moon.classList.add('ri-moon-line');

      if (img) {
        img.style.backgroundImage = `url('https://images.unsplash.com/photo-1601285889979-c517297c5604?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0')`;
      }

      isDark = 0;
    }

    console.log("isDark after click:", isDark);
  });
});