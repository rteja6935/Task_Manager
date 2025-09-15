// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import BoardDetails from "./Components/BoardDetails.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Auth from "./Components/Auth.jsx";
import "./App.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

      

      {/* 🔒 Protected Route */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route
          path="BoardDetails/:id"
          element={
            <PrivateRoute>
              <BoardDetails />
            </PrivateRoute>
          }
        />
        <Route
          index
          element={
            <PrivateRoute>
              <p style={{ padding: "20px" }}>Select a board to view details</p>
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
