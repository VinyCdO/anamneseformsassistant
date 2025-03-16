import { Route, Routes } from "react-router-dom";
import Search from "../pages/search/Search.tsx";
import AnamneseForm from "../forms/AnamneseForm.tsx";

const AppRoutes = () => {
  
  return (
    <Routes>
      <Route path='/search' element={<Search />} />
      <Route path='/anamneseForm' element={<AnamneseForm />} />        
    </Routes>
  );
}

export default AppRoutes;