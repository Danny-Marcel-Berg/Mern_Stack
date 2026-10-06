import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About - Danny Estate";
  }, []);

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        About Danny Estate
      </h1>
      <p className="mb-4 text-slate-700">
        Danny Estate is a leading real estate agency specializing in helping clients buy,
        sell, and rent properties in the most desirable neighborhoods. Our team of experienced
        agents is dedicated to providing exceptional service and making the buying and selling
        process as smooth as possible.
      </p>
      <p className="mb-4 text-slate-700">
        Our mission is to help our clients achieve their real estate goals by providing
        expert advice, personalized service, and a deep understanding of the local market.
        Whether you are looking to buy a dream home, sell a property, or rent a luxury apartment,
        we are here to guide you every step of the way.
      </p>
      <p className="mb-4 text-slate-700">
        With years of experience in the real estate industry, our agents possess a wealth of
        knowledge and expertise. We are committed to delivering the highest level of service
        and creating lasting relationships with our clients.
      </p>
    </div>
  );
};

export default About;
