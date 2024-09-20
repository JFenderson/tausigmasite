import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Members from './pages/Members';
import ActiveMembers from './pages/ActiveMembers';
import BecomeMember from './pages/BecomeMember';
import Foundation from './pages/Foundation';
import Programs from './pages/Programs';
import SigmaBetaClub from './pages/SigmaBetaClub';
import Contact from './pages/Contact';
import CollegiateChapters from './pages/CollegiateChapter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<Members />} />
        <Route path="/active-members" element={<ActiveMembers />} />
        <Route path="/become-a-member" element={<BecomeMember />} />
        <Route path="/collegiate-chapter" element={<CollegiateChapters />} />
        <Route path="/tau-sigma-charity-foundation" element={<Foundation />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/sigma-beta-club" element={<SigmaBetaClub />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
