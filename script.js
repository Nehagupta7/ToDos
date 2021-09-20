const dayName=document.querySelector('#today');
const todayDate=document.querySelector('#date');
const note=document.querySelector('.note');
const addToDos=document.querySelector('#addToDo');
const inputArea=note.querySelector('input');
 const mainDiv=note.querySelector('.main');
 const editToDo=note.querySelector('.editToDo');
 const deleteToDo=note.querySelector('.deleteALL');

console.log();
//get days name 
let nameOfDays=["Sunday","Monday","Tueday","Wednesday","Thrusday","Friday","Saturday"]
let  dayNoStore= new Date().getDay();
let finalDayName = nameOfDays[dayNoStore];
dayName.innerHTML=finalDayName;

//get month date and year
let fullDate = new Date().toDateString().slice(3);
todayDate.innerHTML=fullDate;

/////////////////////////////////////////
const updateLsData = () =>{
  const inputArea=document.querySelectorAll('input');
  const notes=[];
  inputArea.forEach((note) =>{ return notes.push(note.value);
  });
  
console.log(notes);
localStorage.setItem('notes',JSON.stringify(notes));
// inputArea.addEventListener('change',(event)=>{
//   const value=event.target.value;
//   console.log(value);
// });
}
updateLsData();
 const notes=JSON.parse(localStorage.getItem('notes'));
 if(notes){
   notes.forEach((note)=>(note));
 }



addToDos.addEventListener("click" ,(e) => {
if(inputArea.value.trim()) {
   let note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `<input
    type="text"
    name="test"  value="${inputArea.value}" "
    class="inputToDo"
    placeholder="Add ToDos Here.." 
  
  />

<button class="deleteToDo button">
  <i class="fa fa-trash" aria-hidden="true"> </i>
</button>
<button class="editToDo button">
<i class="fa fa-check" aria-hidden="true"></i>
</button>
`;
note.insertAdjacentHTML('afterbegin', htmlData);
document.body.appendChild(note);
console.log(note);

note.addEventListener('click',function(e){
var item=e.target;
console.log(item.classList[1]);

if(item.classList[1]=='fa-trash'){
note.remove();
updateLsData();
}
else if(item.classList[1]== 'fa-check'){
  const completed=note.querySelector('input').disabled="true";
  // completed.classList.toggle('hidden');
console.log(completed);
} 
 });

 inputArea.value ='';

}else if (inputArea.value==""){
alert("enter some text");
}});

// delete all the to dos 
deleteToDo.addEventListener('click', () => {
let  deleteAllToDo=document.querySelectorAll('.note');
for(let i=1;i<deleteAllToDo.length;i++){
deleteAllToDo[i].remove();
updateLsData();
}
});



console.log(finalDayName );
console.log(fullDate);
