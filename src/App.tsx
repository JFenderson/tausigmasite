import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home2';
import About from './pages/About';
import Events from './pages/Events';
import Members from './pages/Members';
import BecomeMember from './pages/BecomeMember';
import Foundation from './pages/Foundation';
import Programs from './pages/Programs';
import SigmaBetaClub from './pages/SigmaBetaClub';
import Contact from './pages/Contact';
import CollegiateChapters from './pages/CollegiateChapter';
import SigmaChapter from './pages/SigmaChapter';
import EtaEpsilonChapter from './pages/EtaEpsilonChapter';
import PiKappaChapter from './pages/PiKappaChapter';
import EpsilonTauChapter from './pages/EpsilonTauChapter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/members" element={<Members />} />
        <Route path="/become-a-member" element={<BecomeMember />} />
        <Route path="/collegiate-chapter" element={<CollegiateChapters />} />
        <Route path="/foundation" element={<Foundation />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/sigma-beta-club" element={<SigmaBetaClub />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chapters/sigma-chapter" element={<SigmaChapter />} />
        <Route path="/chapters/eta-epsilon-chapter" element={<EtaEpsilonChapter />} />
        <Route path="/chapters/pi-kappa-chapter" element={<PiKappaChapter />} />
        <Route path="/chapters/epsilon-tau-chapter" element={<EpsilonTauChapter />} />
      </Routes>
    </Router>
  );
};

export default App;
