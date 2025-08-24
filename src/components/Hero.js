import React from 'react';
import { getHijriDate, getIslamicGreeting } from '../utils/islamicUtils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Hero = () => {
  const hijriDate = getHijriDate();
  const greeting = getIslamicGreeting();

  return (
    <div className="hero min-h-[600px] bg-gradient-to-br from-primary/10 via-background to-secondary/5 islamic-pattern-bg">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          {/* Arabic greeting */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 font-arabic leading-tight">
              {greeting.arabic}
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              {greeting.greeting}
            </p>
          </div>
          
          {/* Welcome message */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Welcome to our Islamic Community Platform
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A place where faith, community, and knowledge come together. 
              Connect with fellow Muslims, access prayer times, and enrich your spiritual journey.
            </p>
          </div>
          
          {/* Hijri date with Badge */}
          <div className="mb-10">
            <Badge variant="outline" className="text-lg px-6 py-3 mb-4">
              Today's Islamic Date
            </Badge>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border inline-block">
              <p className="text-2xl font-semibold text-primary mb-2">
                {hijriDate.fullDate}
              </p>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-primary/20 text-6xl animate-pulse-slow">
        🌙
      </div>
      <div className="absolute top-20 right-20 text-secondary/20 text-4xl animate-pulse-slow">
        ⭐
      </div>
      <div className="absolute bottom-20 left-20 text-primary/20 text-3xl animate-pulse-slow">
        ⭐
      </div>
    </div>
  );
};

export default Hero;
