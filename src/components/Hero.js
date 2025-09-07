import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const images = [
  "/images/havi-imaidok.jpg",
  "/images/a5.jpg",
  "/images/khutba.jpg",
  "/images/a3.jpg",
  "/images/a2.jpg",
  "/images/inside2.jpg",
  "/images/a4.jpg",
  "/images/a1.jpg",
  "/images/khutba-hanganyagok.jpg",
  "/images/a6.jpg",
];

const quotes = [
  "Faith is taking the first step even when you don’t see the whole staircase.",
  "The best among you are those who learn the Quran and teach it.",
  "Kindness is a mark of faith.",
  "Connect, Learn, and Grow in Faith.",
];

const Hero = () => {
  const [currentImg, setCurrentImg] = useState(0);
  // const [quoteIndex, setQuoteIndex] = useState(0);
  const quoteIndex = 0;
  const [typewriterText, setTypewriterText] = useState("");
  const [fade, setFade] = useState(true);

  // Cycle images with random timing
  useEffect(() => {
    const changeImage = () => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
        setFade(true); // fade in new image
      }, 700); // match transition duration (700ms)
    };

    const interval = setInterval(() => {
      changeImage();
    }, 10000); // random 5-8s per image

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const text = quotes[quoteIndex];
    const interval = setInterval(() => {
      setTypewriterText(text.slice(0, i + 1));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [quoteIndex]);
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden text-center">
      {/* Single Image Background */}
      <div
        className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${images[currentImg]})` }}
      ></div>

      {/* Overlay behind text */}
      <div className="absolute inset-0 flex items-center justify-center -mt-15">
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-4">
          <h1 className="text-2xl md:text-6xl font-extrabold text-white drop-shadow-2xl cursor-default">
            Welcome to{" "}
            <span className="bg-clip-text text-6xl text-transparent bg-gradient-to-r from-green-400 to-blue-400">
              Budapest Mosque Community
            </span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/90 cursor-default">
            {typewriterText}
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/prayer-times"
              className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
            >
              View Prayer Times
            </a>
            <a
              href="#join"
              className="flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300"
            >
              Join Community
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-8 flex justify-center gap-6 text-2xl">
            <a href="#" className="text-white hover:text-green-400">
              <FaFacebook />
            </a>
            <a href="#" className="text-white hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-blue-400">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
