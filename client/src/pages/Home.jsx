import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <h1>Welcome to our Homepage!</h1>
    </div>
  );
};

export default Home;
