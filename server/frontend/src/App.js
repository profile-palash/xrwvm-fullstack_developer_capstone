import LoginPanel from "./components/Login/Login"   //LoginPanel es un nombre arbitrario dado al archivo de Login dentro de esta ruta.
import RegisterPanel from "./components/Register/Register"  //RegisterPanel es un nombre arbitrario dado al archivo de Register dentro de esta ruta.
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
    </Routes>
  );
}
export default App;
