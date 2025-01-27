import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const AboutPage = () => {
  return (
    <div>
      <section className="mt-8">
      <Header />
      </section>
    <div className="container mx-auto p-6">
     
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">About Us</h1>
        <p className="mt-4 text-xl text-gray-600">
          Learn more about our restaurant app and how we can help you find the best places to eat.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          We are dedicated to helping you find the best restaurants around you. Whether you're looking
          for a cozy cafe, a fine dining experience, or a quick bite, we’ve got you covered.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">The Team</h2>
        <p className="text-lg">
          Our team consists of passionate foodies and tech enthusiasts who are always striving to bring
          you the most accurate and up-to-date restaurant information.
        </p>
      </section>
      
    </div>
    <section className="mt-8">
        <Footer/>
      </section>
    </div>
  );
};

export default AboutPage;
