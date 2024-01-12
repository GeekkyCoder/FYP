import React from 'react';

// import Typography from 'src/components/Typography/Typography';
import Appbar from './appbar';
import Hero from './hero';
import Footer from 'src/pages/footer';
import AboutUs from 'src/pages/about';
import HowItWorks from 'src/pages/howitworks';
import ProductCTA from 'src/pages/productcta';


export default function LandingPage(props) {
  return (
    <>
      <Appbar />
      <Hero />
      <AboutUs/>
      <HowItWorks/>
      <ProductCTA/>
      <Footer/>
    </>
  );
}
