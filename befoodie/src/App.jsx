import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import "./App.css";
import Home from "./pages/Home/Home";
import Menu from "./pages/Store/Menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
