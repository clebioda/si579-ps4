addTask("Buy Milk");
addTask("Learn to wrap gifts", 1639944400000);

function addTask(description, dueDate) {
    const newListElement = document.createElement('li');
    newListElement.textContent = description;

    if (dueDate) {
        const dateTime = document.createElement("span");
        dateTime.classList.add("due");
        const date = new Date(dueDate);
        dateTime.textContent = "due " + date.toDateString() + " " + date.toLocaleTimeString("en-US");
        newListElement.append(dateTime);
    }

    const doneButtonElement = document.createElement('button');
    doneButtonElement.classList.add("btn", "btn-sm", "btn-outline-danger", "done");
    doneButtonElement.textContent = 'Done';
    doneButtonElement.addEventListener("click", function() {
        newListElement.remove();
    });
    newListElement.append(doneButtonElement); // add the button onto the end of the new list element

    const taskList = document.getElementById("task_list");
    taskList.append(newListElement);
    document.getElementById("task_description_input").value = "";
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

const addButton = document.getElementById("add_task");
addButton.addEventListener('click', addTaskAction);

function addTaskAction() {
    const descriptionInput = document.getElementById("task_description_input");
    const dueDateInput = document.getElementById("duedate_input");
    const dueTimeInput = document.getElementById("duetime_input");
    const dueTime = dateAndTimeToTimestamp(dueDateInput, dueTimeInput);
    addTask(descriptionInput.value, dueTime);
    //descriptionInput.value = "";
    //dueDateInput.value = "";
    //dueTimeInput.value = "";
}

const inputSection = document.getElementById("task_description_input");
inputSection.addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        addTaskAction();
    }
});