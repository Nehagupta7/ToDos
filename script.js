const dayName = document.querySelector("#today");
const todayDate = document.querySelector("#date");
const noteClass = document.querySelector(".inputContainer");
const addToDos = noteClass.querySelector("#addToDo");
const inputArea = noteClass.querySelector("input");
const editToDo = noteClass.querySelector(".editToDo");
const clearAll = noteClass.querySelector("#clearAll");

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

// update local storage data.and empty array [notes] store the input value
const updateLsData = () => {
  const noteClassOfInput = document.querySelectorAll(".spanTag");
  const notes = [];
  noteClassOfInput.forEach((NodeList) => {
    notes.push(NodeList.innerHTML);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addnote = () => {
  if (inputArea.value.trim()) {
    let note = document.createElement("ul");
    note.classList.add("note");
    const htmlData = `
    <li  class ="liTag" >
    <input type="checkbox"  class=" liTagInput">
    <span class="spanTag"> ${inputArea.value} </span> </li>

<button class="deleteToDo button" id="deleteToDo">
  <i class="fa fa-trash" aria-hidden="true"> </i>
</button>
<button class="editToDo button" id="editToDo">
  <i class="fa fa-pencil-square-o" aria-hidden="true"> </i>
  <button class="saveToDo editToDo button" id="saveToDo">
  <i class="fa fa-check" aria-hidden="true"> </i>
</button>
 </li> 
`;

    note.insertAdjacentHTML("afterbegin", htmlData);
    document.body.appendChild(note);
    console.log(note);
    // getting refernce fa-chech
    const litag = note.querySelector(".liTag");
    const liTagInput = note.querySelector(".liTagInput");
    const deleteToDo = note.querySelector(".deleteToDo");
    const saveToDo = note.querySelector(".saveToDo");
    const editToDo = note.querySelector(".editToDo");
    const spanTag = note.querySelector(".spanTag");

    // end of div element creation
    note.addEventListener("click", function (e) {
      var item = e.target;
      console.log(item.classList[0]);
      switch (item.classList[0]) {
        case "liTagInput":
          if (liTagInput.checked == true) {
            deleteToDo.style.display = "block";
          } else if (liTagInput.checked == false) {
            deleteToDo.style.display = "none";
          }
          break;
        case "editToDo":
          spanTag.contentEditable = "true";
          saveToDo.style.display = "block";
          spanTag.focus();
          spanTag.innerHTML;
          updateLsData();
          break;
        case "saveToDo":
          saveToDo.style.display = "none";
          updateLsData();
          break;
        case "deleteToDo":
          console.log("delete");
          note.remove();
          updateLsData();
          break;
      }
    });
  } else if (inputArea.value === "") {
    inputArea.placeholder = "please enter some input!!!!!!!";
  }
  inputArea.value = "";
  updateLsData();
};

//delete all the to dos
clearAll.addEventListener("click", () => {
  let deleteAllToDo = document.querySelectorAll(".note");
  deleteAllToDo.forEach((note) => {
    note.remove();
    updateLsData();
  });
});

//click event on button for add notes
addToDos.addEventListener("click", () => addnote());
// get element from the local storage
let notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    inputArea.value = note;
    addnote(note);
  });
  updateLsData();
}
