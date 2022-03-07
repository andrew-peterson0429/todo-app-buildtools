
let todos = [
    {
        id: 1,
        taskName: "Task 1",
        completed: false,
        category: "Work"
    },
    {
        id: 2,
        taskName: "Task 2",
        completed: true,
        category: "School"
    },
    {
        id: 3,
        taskName: "Task 3",
        completed: false,
        category: "Uncategorized"
    },
]
let categories = []

const updateTodos = (list) => {
    let taskList = document.querySelector('#taskList')
    taskList.innerHTML = `<ul>`

    list.map((list) => {
        taskList.innerHTML +=
            `<li class="card w-50">
                <div class="card-body">
                    <div>
                    <button type="button" id="task${list.id}Close" class="btn-close float-end ms-2 mt-1" aria-label="Close" todoID="${list.id}" buttonFunc="close"></button>
                        <button type="button" id="task${list.id}Edit" class="btn btn-success btn-sm float-end" todoID="${list.id}" buttonFunc="edit">Edit</button>
                    </div>
                    <input type="checkbox" id="task${list.id}Completed" name="task${list.id}" ${list.completed == true ? 'checked' : ''} todoId="${list.id}" buttonFunc="complete">
                    <label for="task${list.id}"> ${list.taskName}</label><br>
                    <label for="task${list.id}"> ${list.category}</label><br>
                    
                </div>
            </li>`;
    })
    taskList.innerHTML += `</ul>`

    taskList.addEventListener('click', eventClickHandler)

}

function eventClickHandler(event){
    // console.log(event)
    // console.log(event.target.id)
    // console.log(event.target.attributes.buttonFunc.value)
    // console.log(event.target.attributes.todoId)

    if(event.target.attributes.buttonFunc.value == "complete"){
        completeTodo(event.target.attributes.todoId.value)
    }
    else if(event.target.attributes.buttonFunc.value == "close"){
        deleteTodo(event.target.attributes.todoId.value)
    }
    else if(event.target.attributes.buttonFunc.value == "edit"){
        editTodo(event.target.attributes.todoId.value)
    }
}

// event listener for add task btn
document.querySelector("#addTaskButton").addEventListener('click', () => {

    let inputBox = document.querySelector('#newTaskName');
    let newTaskName = inputBox.value
    if (newTaskName !== '') {
        let newId = todos.length + 1
        let newCategory = document.querySelectorAll('#filterDropdown')[0].value // new todo select will always be first
        if (newCategory === 'Select Category') {
            newCategory = 'Uncategorized'
        }

        inputBox.value = "";

        todos.push({ id: newId, taskName: newTaskName, completed: false, category: newCategory })
        updateTodos(todos);
    }
})

// event listener for add category btn
document.querySelector("#addCategoryButton").addEventListener('click', () => {
    let inputBox = document.querySelector('#newCategoryName')
    let newCategory = inputBox.value

    if (!categories.includes(newCategory) && newCategory != "") {
        categories.push(newCategory)

        let dropdowns = document.querySelectorAll('.categoryPicker')
        dropdowns.forEach((dropdown) => {
            const newElement = document.createElement('option');
            newElement.value = newCategory
            newElement.innerHTML = newCategory
            dropdown.appendChild(newElement)
        })
    }

    inputBox.value = "";

    todos.push({ id: newId, taskName: newTaskName, completed: false, category: newCategory })
    updateTodos(todos);
})

updateTodos(todos);



function deleteTodo(id) {
    todos = todos.filter(element => {
        if (element.id != id) {
            return element;
        }

    })

    updateTodos(todos)
}

function completeTodo(id) {
    todos = todos.filter(element => {
        if (element.id == id) {
            element.completed = !element.completed;
        }
        return element;
    })
}

function deleteCompleted() {
    todos = todos.filter(element => {
        if (element.completed === false) {
            return element
        }
    })
    updateTodos(todos)
}

document.querySelector('#delete-tasks-btn').addEventListener('click', () => {
    deleteCompleted();
})

let todoBeingEdited = [];



//edit 
function editTodo(index) {
    let todo = todos[index - 1];
    todoBeingEdited.push(todo);
    document.querySelector('#newTaskName').value = todo.taskName;
    document.querySelector('#newCategoryName').value = todo.category;
    document.querySelector('#saveTaskButton').style.display = 'block';
    document.querySelector('#addTaskButton').style.display = 'none';
}

//save 
const saveTodo = () => {
    let value = document.querySelector('#newTaskName').value;
    let todoToSave = todoBeingEdited.pop();
    todos[todoToSave.id - 1].taskName = value;
    document.querySelector('#newTaskName').value = '';
    document.querySelector('#saveTaskButton').style.display = 'none';
    document.querySelector('#addTaskButton').style.display = 'block';
    updateTodos(todos)
}

document.querySelector('#saveTaskButton').addEventListener('click', () => {
    saveTodo();
})

// grab unique categories and display them in drop down
function getAllCategories() {

    categories = todos.map((todo) => {
        if (!categories.includes(todo.category) && todo.category != '') {

            let dropdowns = document.querySelectorAll(".categoryPicker");
            dropdowns.forEach((dropdown) => {
                const newElement = document.createElement('option');
                newElement.value = `${todo.category}`
                newElement.innerHTML = `${todo.category}`
                dropdown.appendChild(newElement)
            })
            return todo.category
        }
    })
}

//view by Categories
const filterList = (event) => {
    let selectElement = event.target;
    let value = selectElement.value;
    let filteredList = todos.filter(e => e.category == value);
    filteredList.length > 0 ? updateTodos(filteredList) : updateTodos(todos);

} 
const filterDropDown = document.getElementById('filterCategory');
filterDropDown.addEventListener('change', filterList);

getAllCategories();