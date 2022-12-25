import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import NotFound from "./components/NotFound";
function App() {
  return (
    <div className=" h-[100vh]  ">
      {/* //369 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<AddContact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
