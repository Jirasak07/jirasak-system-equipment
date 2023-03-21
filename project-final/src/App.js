import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Product/>} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
