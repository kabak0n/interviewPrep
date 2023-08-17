import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);
  const numOfTotalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()];
  const indexOfLastTodos = currentPage * todosPerPage;
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage;

  const visibleTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos);
  const previousPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      <h1>Todos</h1>

      {visibleTodos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <span>Todos per page: </span>
      <select onChange={(e) => setTodosPerPage(e.target.value)}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
      <div>
        <span onClick={previousPageHandler}>Prev | </span>
        <span>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? "active" : ""}`}
            >{`${page} | `}</span>
          ))}
        </span>
        <span onClick={nextPageHandler}>Next</span>
      </div>
    </div>
  );
}
