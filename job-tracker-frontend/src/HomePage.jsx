import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 font-sans">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-700">JobTracker</h1>
        <div className="space-x-6">
          <Link to="/login" className="hover:text-indigo-600 font-medium">Login</Link>
          <Link to="/signup" className="hover:text-indigo-600 font-medium">Sign Up</Link>
        </div>
      </nav>
<div className="bg-red-500 text-white p-4 rounded-lg">
  If you see red, Tailwind is working 🎉
</div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
        <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
          <span className="italic">Seamless</span> updates on your job applications 🚀
        </h2>
        <p className="text-gray-600 max-w-2xl mb-8 text-lg">
          Simplify your job application process by organizing and tracking your applications — powered by habit-building design.
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-md hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-md hover:bg-indigo-50 transition"
          >
            Read About Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
