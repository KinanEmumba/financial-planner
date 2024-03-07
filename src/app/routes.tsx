import { Route, Routes } from "react-router-dom";
import Dashboard from "src/pages/dashboard";
import Splash from "src/pages/splash";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"	element={<Splash />} />
      <Route path="/dashboard"	element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoutes;