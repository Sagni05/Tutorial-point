import Form from "./Component/Form/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditData from "./Component/Edit/EditData";
import CardDetail from "./Component/Deatails/Details";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Form />} />
          <Route path="/editData/:_id" element={<EditData />} />
          <Route path="/detail/:_id" element={<CardDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
