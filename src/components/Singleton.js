class TodoList {
  constructor() {
    if (TodoList.instance == null) {
      this.todos = JSON.parse(localStorage.getItem("todo-list")) ?? [];

      TodoList.instance = this;
    }
    return TodoList.instance;
  }
  addTodo = (todo) => {
    this.todos.push(todo);
    this.updateLocalStorage(this.todos);
  };
  updateTodo = (todo) => {
    this.todos = this.todos.map((item) => {
      return item.id === todo.id ? todo : item;
    });
    this.updateLocalStorage(this.todos);
  };
  removeTodo = (todo) => {
    this.todos = this.todos.filter((item) => {
      return item.id !== todo.id;
    });
    this.updateLocalStorage(this.todos);
  };
  updateLocalStorage = (todoList) => {
    localStorage.setItem("todo-list", JSON.stringify(todoList));
  };
}

const Todos = new TodoList();

export default Todos;
