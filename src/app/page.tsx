"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero, { Hero3, Hero4, Hero5 } from "./components/hero";
import Main from "./components/Main";


export default function App() { // Renamed the local function
  return (
    <div>
      <Header />
      <Hero />
      <Hero3 />
      <Main />
      <br />
      <Hero4 />
      <Hero5 />
      <br />
      <Footer />
    </div>
  );
}
