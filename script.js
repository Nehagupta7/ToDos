const dayName=document.querySelector('#today');
const todayDate=document.querySelector('#date');
const addToDos=document.querySelector('#addToDo');
const inputArea=document.querySelector('#notes');
 
//get days name 
let nameOfDays=["Sunday","Monday","Tueday","Wednesday","Thrusday","Friday","Saturday"]
let  dayNoStore= new Date().getDay();
let finalDayName = nameOfDays[dayNoStore];
dayName.innerHTML=finalDayName;

//get month date and year
let fullDate = new Date().toDateString().slice(3);
todayDate.innerHTML=fullDate;


addToDos.addEventListener("click" ,() => {



    console.log(inputArea);
});


console.log(finalDayName );
console.log(fullDate);