import React from "react";
import JobHero from "./Hero";
import Header from "./Header";
import JobOurServices from "./OurServices";
import JobWhyChooseUs from "./JobWhyChooseUs";
import JobStats from "./JobStats";
import JobTestimonials from "./JobTestimonials";

const Home = () => {
  return (
    <>
      <JobHero />
      <JobOurServices />
      <JobWhyChooseUs />
      <JobStats />
      <JobTestimonials />
    </>
  );
};

export default Home;
