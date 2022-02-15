const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const headerButton = document.querySelector(".header-button");
const todoRemove = document.querySelector(".todo-remove");

let toDoData = JSON.parse(localStorage.getItem("data"))
  ? JSON.parse(localStorage.getItem("data"))
  : [];

function render() {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  localStorage.setItem("data", JSON.stringify(toDoData));
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      let index = toDoData.indexOf(item);
      toDoData[index].completed = item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      let index = toDoData.indexOf(item);
      toDoData.splice(index, 1);
      render();
    });
  });
}

render();

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  if (headerInput.value.trim().length === 0) {
    return "";
  }

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);

  headerInput.value = "";

  render();
});
