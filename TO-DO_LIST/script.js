document.addEventListener("DOMContentLoaded", function () {
  let inputbox = document.getElementById("input-box");
  let addBtn = document.getElementById("add-btn");
  let todolist = document.getElementById("todolist");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => rendertask(task));

  inputbox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const taskText = inputbox.value.trim();
      if (taskText) {
        let newtask = {
          text: taskText,
          id: Date.now(),
          completed: false,
        };
        tasks.push(newtask);
        savetasks();
        rendertask(newtask);
        inputbox.value = "";
      }
    }
  });
  addBtn.addEventListener("click", function () {
    const taskText = inputbox.value.trim();
    if (taskText) {
      let newtask = {
        text: taskText,
        id: Date.now(),
        completed: false,
      };
      tasks.push(newtask);
      savetasks();
      rendertask(newtask);
      inputbox.value = "";
    }
  });

  function rendertask(task) {
    const li = document.createElement("li");
    li.setAttribute("task-id", task.id);
    li.className =
      "w-120 bg-pink-300/80 backdrop-blur-xl flex justify-around gap-20 items-center p-3 rounded-xl shadow-lg border-4 border-solid border-pink-300 m-2";

    const divbox = document.createElement("div");
    divbox.className = "flex items-center gap-8 w-70";

    const check = document.createElement("button");
    check.className =
      "w-7 h-7 rounded-full bg-white cursor-pointer border-4 border-solid border-pink-400";

    const textdiv = document.createElement("div");
    textdiv.textContent = task.text;
    textdiv.className = "font-mono text-xl text-rose-800/60";

    check.addEventListener("click", function () {
      task.completed = !task.completed;
      textdiv.classList.toggle("completed");
      check.classList.toggle("bg-color");
      savetasks();
    });

    if (task.completed) {
      textdiv.classList.add("completed");
      check.classList.add("bg-color");
    }

    divbox.appendChild(check);
    divbox.appendChild(textdiv);

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.className =
      "cursor-pointer bg-red-400/70 p-1 rounded-lg w-15 shadow-md text-red-900 border-solid border-2 border-red-900/30 hover:bg-red-700/50 hover:scale-110 transition ease-in-out duration-20 ";

    li.appendChild(divbox);
    li.appendChild(deletebtn);

    deletebtn.addEventListener("click", function (e) {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      savetasks();
    });

    todolist.appendChild(li);
  }

  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
