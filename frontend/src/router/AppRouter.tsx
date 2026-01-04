import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

import Login from "../pages/Login/Login";
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";
import Newsletter from "../pages/Newsletter/Newsletter";
import Register from "../pages/Register/Register";
import Landing from "../pages/Landing/Landing";
import Home from "../pages/Home/Home";
import OpportunitiesList from "../pages/Opportunity/Opportunity";
import OpportunityDetails from "../pages/Opportunity/subpages/OpportunityDetails/OpportunityDetails";
import EventsList from "../pages/Event/EventsList";
import EventDetails from "../pages/Event/subpages/EventDetails";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/recuperar-senha" element={<PasswordRecovery />} />
        
        <Route path="/newsletter" element={<Newsletter />} />
        
        <Route path="/cadastro" element={<Register />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          
          <Route path="/oportunidades" element={<OpportunitiesList />} />
          <Route path="/oportunidades/:id" element={<OpportunityDetails />} />
          
          <Route path="/eventos" element={<EventsList />} />
          <Route path="/eventos/:id" element={<EventDetails />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
