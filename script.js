const dayName = document.querySelector("#today");
const todayDate = document.querySelector("#date");
const noteClassOfDiv = document.querySelector(".note");
const addToDos = document.querySelector("#addToDo");
const inputArea = noteClassOfDiv.querySelector("input");
const mainDiv = noteClassOfDiv.querySelector(".main");
const editToDo = noteClassOfDiv.querySelector(".editToDo");
const deleteToDo = noteClassOfDiv.querySelector(".deleteALL");
const inputOfAllInput = noteClassOfDiv.querySelector("input");

//get days name
let nameOfweeks = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];
let dayNumberStore = new Date().getDay();
let finalDayName = nameOfweeks[dayNumberStore];
dayName.innerHTML = finalDayName;

//get month date and year
let fullDate = new Date().toDateString().slice(3);
todayDate.innerHTML = fullDate;

/////////////////////////////////////////
// update local storage data.and empty array [notes] store the input value
const updateLsData = () => {
  const noteClassOfInput= document.querySelectorAll(".inputToDo");
  const notes = [];
  noteClassOfInput.forEach((input) => {
  notes.push(input.value);
  });
  localStorage.setItem('notes', JSON.stringify(notes)); 
};

const addnote = () => {
if(inputArea.value.trim()){
  let note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `<input
    type="text"
    name="test"  value="${inputArea.value}" 
    class="inputToDo"
    placeholder="Add ToDos Here.." 
  
 />

<button class="deleteToDo button">
  <i class="fa fa-trash" aria-hidden="true"> </i>
</button>
<button class="editToDo button">
  <i class="fa fa-pencil-square-o" aria-hidden="true"> </i>
</button>
<button class="editToDo button">
<i class="fa fa-check" aria-hidden="true"></i>
</button>
`;
  note.insertAdjacentHTML("afterbegin", htmlData);
  document.body.appendChild(note);
  console.log(note);
  // end of div element creation
  //div element has  note class  and add some button task
  note.addEventListener("click", function (e) {
    var item = e.target;
    if (item.classList[1] == "fa-trash") {
      note.remove();
      updateLsData();
    } else if (item.classList[1] == "fa-pencil-square-o") {
  const selectInput= note.querySelector("input");
let editInput=prompt("edit this",selectInput.value)
selectInput.value=editInput;
updateLsData();
    }else if (item.classList[1] == "fa-check") {
      const completed = (note.querySelector("input").readOnly = "true");
      console.log(completed);
    }
  
  });
}
else if(inputArea.value===""){
  alert("enter some todos");
}
  inputArea.value = "";
}

// delete all the to dos
deleteToDo.addEventListener("click", () => {
 let deleteAllToDo = document.querySelectorAll(".note");
 for (let i = 1; i < deleteAllToDo.length; i++) 
  {
    deleteAllToDo[i].remove();
    updateLsData();
  }
});

//input area value store in input element value
inputArea.addEventListener("change", (event) => {
  const value = event.target.value;
  inputArea.value = value;
  updateLsData();
});
//click event on button for add notes 
addToDos.addEventListener("click", () => addnote());

// get element from the local storage
//notes get from local storage and store on notes 
let notes = JSON.parse(localStorage.getItem("notes"));  
//if condition check if  notes are present than forEach loop store value in inputdata
if (notes) {
  notes.forEach(note => {
  inputOfAllInput.value = note;
   addnote(note);
  });
  updateLsData( );
}
