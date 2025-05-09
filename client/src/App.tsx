import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { AnimatePresence } from "framer-motion";
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
import { ThemeProvider } from "./components/ThemeProvider";
import { useBasePath } from "./hooks/useBasePath";

function App() {
  const { path } = useBasePath();
  
  useEffect(() => {
    // Apply default theme
    document.documentElement.setAttribute('element-theme', '1');
  }, []);
  
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen relative bg-background text-foreground">
        <GridBackground />
        <Navbar />
        <main className="flex-grow relative z-10 pt-20">
          <AnimatePresence mode="wait">
            <Switch location={path} key={path}>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/work">
                <Work />
              </Route>
              <Route path="/work/:id">
                <WorkDetail />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/play">
                <Play />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;