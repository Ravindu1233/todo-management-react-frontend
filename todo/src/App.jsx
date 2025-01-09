import "./App.css";
import ListTodoComponent from "./components/ListTodoComponent";
import HeadrerComponent from "./components/HeadrerComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TodoComponent from "./components/TodoComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  }

  return (
    <BrowserRouter>
      <HeadrerComponent />
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route
          path="/todos"
          element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/add-todo"
          element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/update-todo/:id"
          element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }
        />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
