const masList = [];

const list = document.getElementById("list");
const newItemLi = document.createElement("li");
const newDiv = document.createElement("div");

const input = document.getElementById("inp");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    document.querySelector(".form-button").click();
  }
});

function newTask() {
  let getTask = document.getElementById("inp").value;

  if (getTask === "") {
    newDiv.textContent = "Write text";
    newDiv.classList.add("form-list-alert");
    list.prepend(newDiv);
  } else {
    let alert = document.querySelector(".form-list-alert");
    if (alert != null) {
      alert.remove();
    }

    let newObj = {
      id: Date.now(),
      body: getTask,
      complete: false,
    };
    masList.push(newObj);

    const newItemLi = document.createElement("li");
    const newDivItem = document.createElement("div");
    const newDivButtons = document.createElement("div");
    const newCheckBox = document.createElement("input");
    const newButtonRemove = document.createElement("button");
    const newButtonEdit = document.createElement("button");

    newItemLi.classList.add("form-item");
    newDivItem.classList.add("form-item-text");
    newDivButtons.classList.add("form-item-buttons");
    newButtonRemove.classList.add("form-item-button");
    newButtonRemove.classList.add("form-item-button-remove");
    newButtonEdit.classList.add("form-item-button");
    newButtonEdit.classList.add("form-item-button-edit");

    newCheckBox.classList.add("form-item-checkbox");

    newCheckBox.type = "checkbox";

    let currentData = masList.length - 1;
    newDivItem.textContent = masList[currentData].body;
    newItemLi.setAttribute("id", `${masList[currentData].id}`);

    list.prepend(newItemLi);
    newItemLi.appendChild(newDivItem);
    newItemLi.appendChild(newDivButtons);
    newDivButtons.appendChild(newButtonEdit);
    newDivButtons.appendChild(newButtonRemove);

    newItemLi.prepend(newCheckBox);
    haveDone();
    removeElem();
    editElem();
  }
  document.getElementById("inp").value = "";
}
function haveDone() {
  const inpCheckboxAll = document.getElementsByClassName("form-item-checkbox");
  for (const inpCheckbox of inpCheckboxAll) {
    inpCheckbox.addEventListener("change", () => {
      const nextElemDiv = inpCheckbox.nextElementSibling;
      const elemItemDone = inpCheckbox.parentElement;
      const editButton = nextElemDiv.nextSibling.firstChild;

      let currentItemID = Number(inpCheckbox.parentElement.getAttribute("id"));

      let taskIndex = masList.findIndex((task) => task.id === currentItemID);
      if (taskIndex !== -1) {
        if (inpCheckbox.checked === true) {
          masList[taskIndex].complete = true;
          editButton.classList.add("display-none");

          list.appendChild(elemItemDone);
          nextElemDiv.classList.add("form-list-done");
        } else {
          masList[taskIndex].complete = false;
          editButton.classList.remove("display-none");
          nextElemDiv.classList.remove("form-list-done");
          list.prepend(elemItemDone);
        }
      }
    });
  }
}

function removeElem() {
  const bthDeleteAll = document.getElementsByClassName(
    "form-item-button-remove"
  );

  for (const bthDelete of bthDeleteAll) {
    bthDelete.innerHTML = `
<svg  height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 290 290" xml:space="preserve">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <g id="XMLID_24_"> <g id="XMLID_29_"> <path d="M265,60h-30h-15V15c0-8.284-6.716-15-15-15H85c-8.284,0-15,6.716-15,15v45H55H25c-8.284,0-15,6.716-15,15s6.716,15,15,15 h5.215H40h210h9.166H265c8.284,0,15-6.716,15-15S273.284,60,265,60z M190,60h-15h-60h-15V30h90V60z"/> </g> <g id="XMLID_86_"> <path d="M40,275c0,8.284,6.716,15,15,15h180c8.284,0,15-6.716,15-15V120H40V275z"/> </g> </g> </g>

</svg>`;
    bthDelete.classList.add("svg-icon");
    bthDelete.addEventListener("click", () => {
      let currentItemID = Number(
        bthDelete.parentElement.parentElement.getAttribute("id")
      );
      let taskIndex = masList.findIndex((task) => task.id === currentItemID);
      if (taskIndex !== -1) {
        masList.splice(taskIndex, 1);
        const parentLi = bthDelete.parentElement.parentElement;
        parentLi.classList.add("animationDelete");

        parentLi.addEventListener("animationend", () => {
          parentLi.remove();
        });
      }
    });
  }
}

function editElem() {
  const editElemAll = document.querySelectorAll(".form-item-button-edit");
  for (const editElem of editElemAll) {
    editElem.innerHTML = `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"/></svg>`;
    editElem.classList.add("svg-icon");

    editElem.addEventListener("click", () => {
      let currentItemID = Number(
        editElem.parentElement.parentElement.getAttribute("id")
      );
      let taskIndex = masList.findIndex((task) => task.id === currentItemID);
      document.getElementById("inp").value = masList[taskIndex].body;

      editElem.nextElementSibling.classList.add("display-none");

      editElem.parentElement.parentElement.classList.add("bg-color");
      const inputForm = document.querySelector(".form-form");
      const editButton = document.querySelector(".form-button-edit");

      if (!editButton) {
        const editButton = document.createElement("button");
        editButton.innerHTML = `<svg class ="svg-icon" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 32 32" xml:space="preserve">
<g>
	<g id="spin">
		<g>
			<path   d="M25.883,6.086l-2.82,2.832C24.953,10.809,26,13.324,26,16c0,5.516-4.484,10-10,10v-2l-4,4l4,4v-2
				c7.719,0,14-6.281,14-14C30,12.254,28.539,8.734,25.883,6.086z"/>
			<path  d="M20,4l-4-4v2C8.281,2,2,8.281,2,16c0,3.746,1.461,7.266,4.117,9.914l2.82-2.832
				C7.047,21.191,6,18.676,6,16c0-5.516,4.484-10,10-10v2L20,4z"/>
		</g>
	</g>
</g>
</svg>`;
        editButton.classList.add("form-button-edit");
        editButton.type = "button";
        inputForm.appendChild(editButton);

        const buttonNewTask = document.querySelector(".form-button");
        buttonNewTask.disabled = true;

        editButton.addEventListener("click", () => {
          editElem.nextElementSibling.classList.remove("display-none");
          editElem.parentElement.parentElement.classList.remove("bg-color");
          let getTask = document.getElementById("inp").value;
          masList[taskIndex].body = getTask;
          const parentLi =
            editElem.parentElement.parentElement.querySelector(
              ".form-item-text"
            );

          if (getTask === "") {
            newDiv.textContent = "Write text";
            newDiv.classList.add("form-list-alert");
            list.prepend(newDiv);
          } else {
            let alert = document.querySelector(".form-list-alert");
            if (alert != null) {
              alert.remove();
            }
            parentLi.textContent = getTask;
            editButton.remove();
            document.getElementById("inp").value = "";
            buttonNewTask.disabled = false;
          }
        });
      }
    });
  }
}
