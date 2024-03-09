import { Route, Routes } from "react-router-dom";
import HomeTabs from "src/components/HomeTabs";
import Dashboard from "src/pages/dashboard";
import Goals from "src/pages/goals";
import Splash from "src/pages/splash";
import Transactions from "src/pages/transactions";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"	element={<Splash />} />
			<Route path="/home" element={<HomeTabs />}>
				<Route index path="dashboard" element={<Dashboard />} />
				<Route path="transactions" element={<Transactions />} />
				<Route path="goals" element={<Goals />} />
  		</Route>
    </Routes>
  )
}

export default AppRoutes;