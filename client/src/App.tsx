import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import About from "./pages/About";
import Play from "./pages/Play";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GridBackground from "./components/GridBackground";

function App() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <GridBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/work" component={Work} />
          <Route path="/work/:id" component={WorkDetail} />
          <Route path="/about" component={About} />
          <Route path="/play" component={Play} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
