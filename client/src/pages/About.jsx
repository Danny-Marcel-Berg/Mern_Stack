import { useEffect } from "react";
const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <div>
      <h1 className="text-center"> Welcome to the About site </h1>
    </div>
  );
};

export default About;
