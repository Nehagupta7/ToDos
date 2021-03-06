const dayName = document.querySelector("#today");
const todayDate = document.querySelector("#date");
const noteClass = document.querySelector(".inputContainer");
const addToDos = noteClass.querySelector("#addToDo");
const inputArea = noteClass.querySelector("input");
const editToDo = noteClass.querySelector(".editToDo");
const clearAll = noteClass.querySelector("#clearAll");
const form = document.querySelector("#form");

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
    <span class="spanTag" > ${inputArea.value} </span> </li>

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
    // getting refernce
    const saveToDo = note.querySelector(".saveToDo");
    const spanTag = note.querySelector(".spanTag");
    inputArea.value = "";

    // end of div element creation
    note.addEventListener("click", function (e) {
      var item = e.target;
      console.log(item.classList[0]);
      switch (item.classList[0]) {
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
  } else if (inputArea.value.length === 0) {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.innerHTML = "please enter some todos!!!";
    document.body.appendChild(alertDiv);

    const okButton = document.createElement("button");
    okButton.classList.add("okButton");
    okButton.innerText = "Ok";
    alertDiv.appendChild(okButton);

    okButton.addEventListener("click", () => {
      alertDiv.remove();
    });

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
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

//form event
form.addEventListener("submit", (event) => {
  event.preventDefault();
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
