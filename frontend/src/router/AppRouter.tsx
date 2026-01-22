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
import BusSchedule from "../pages/BusSchedule/BusSchedule";
import RuMenu from "../pages/RuMenu/RuMenu";
import Assistencia from "../pages/Assistance/Assistencia";
import AcademicCalendar from "../pages/AcademicCalendar/AcademicCalendar";
import NoticiaRegister from "../pages/NewsRegister/NoticiaRegister";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/senha/recuperar" element={<PasswordRecovery />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/ru/cardapio" element={<RuMenu />} />
        <Route path="/onibus/horarios" element={<BusSchedule />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          
          <Route path="/oportunidades" element={<OpportunitiesList />} />
          <Route path="/oportunidades/:id" element={<OpportunityDetails />} />
          
          <Route path="/eventos" element={<EventsList />} />
          <Route path="/eventos/:id" element={<EventDetails />} />

          <Route path="/assistencia" element={<Assistencia />} />

          <Route path="/calendario/academico" element={<AcademicCalendar />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/usuario/cadastro" element={<Register />} />
          <Route path="/noticia/novo" element={<NoticiaRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;