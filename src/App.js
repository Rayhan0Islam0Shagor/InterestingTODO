// import packages
import { Container } from "react-bootstrap";
// import scss
import "./application.css";
// import Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="app">
      <Container>
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
