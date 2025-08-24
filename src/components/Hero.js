import React from 'react';
import { getHijriDate, getIslamicGreeting } from '../utils/islamicUtils';

const Hero = () => {
  const hijriDate = getHijriDate();
  const greeting = getIslamicGreeting();

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background with Islamic pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-islamic-primary/10 via-white to-islamic-secondary/5 islamic-pattern-bg"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-islamic-primary/20 text-6xl">
        🌙
      </div>
      <div className="absolute top-20 right-20 text-islamic-secondary/20 text-4xl">
        ⭐
      </div>
      <div className="absolute bottom-20 left-20 text-islamic-primary/20 text-3xl">
        ⭐
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Arabic greeting */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-islamic-primary mb-4 font-arabic">
            {greeting.arabic}
          </h1>
          <p className="text-xl md:text-2xl text-islamic-text-secondary font-medium">
            {greeting.greeting}
          </p>
        </div>
        
        {/* Welcome message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-islamic-text-primary mb-4">
            Welcome to our Islamic Community Platform
          </h2>
          <p className="text-lg md:text-xl text-islamic-text-secondary max-w-2xl mx-auto leading-relaxed">
            A place where faith, community, and knowledge come together. 
            Connect with fellow Muslims, access prayer times, and enrich your spiritual journey.
          </p>
        </div>
        
        {/* Hijri date */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 inline-block">
          <div className="text-center">
            <p className="text-sm text-islamic-text-secondary mb-2">Today's Islamic Date</p>
            <p className="text-xl font-semibold text-islamic-primary">
              {hijriDate.fullDate}
            </p>
            <p className="text-sm text-islamic-text-secondary mt-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-auto">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-islamic-primary/20"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19.84,81.84-39.12,126.6-48.73,42.05-9.37,85.66-12.88,128.65-6.35,42.84,6.5,83.55,20.72,120.25,37.12,35.47,15.84,67.82,36.11,96.43,60.57,1.65,1.39,3.28,2.79,4.9,4.2C1058.31,76.58,1133,74.57,1200,52.47V0Z" 
            opacity=".5" 
            className="fill-islamic-primary/10"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
