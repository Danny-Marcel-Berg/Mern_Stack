import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile - Danny Estate";
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        setCurrentUser(null);
      }
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      localStorage.removeItem("currentUser");
      window.dispatchEvent(new Event("storage"));
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    return (
      <div className="p-3 max-w-lg mx-auto text-center my-10">
        <h1 className="text-2xl font-semibold mb-4">You are not signed in</h1>
        <button
          onClick={() => navigate("/sign-in")}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <div className="flex flex-col items-center gap-4 border p-6 rounded-xl shadow-sm bg-white">
        <img
          src={currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover border-2 border-slate-300"
        />
        <div className="w-full flex flex-col gap-2 mt-4">
          <p className="text-slate-700">
            <span className="font-semibold">Username:</span> {currentUser.username}
          </p>
          <p className="text-slate-700">
            <span className="font-semibold">Email:</span> {currentUser.email}
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
