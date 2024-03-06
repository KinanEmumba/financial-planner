import { Route, Routes } from "react-router-dom";
import Splash from "src/pages/splash";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"	element={<Splash />} />
    </Routes>
  )
}

export default AppRoutes;