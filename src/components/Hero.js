import React, { useState, useEffect } from 'react';
import { getHijriDate, getIslamicGreeting } from '../utils/islamicUtils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FiSun, FiStar, FiArrowDown } from 'react-icons/fi';

const Hero = () => {
  const [hijriDate, setHijriDate] = useState(null);
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    setHijriDate(getHijriDate());
    setGreeting(getIslamicGreeting());
  }, []);

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center relative">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Arabic greeting */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-arabic leading-tight">
            {greeting?.arabic}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            {greeting?.greeting}
          </p>
        </div>
        
        {/* Welcome message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Welcome to our Islamic Community Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A place where faith, community, and knowledge come together. 
            Connect with fellow Muslims, access prayer times, and enrich your spiritual journey.
          </p>
        </div>
        
        {/* Hijri date */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            Today's Islamic Date
          </Badge>
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <p className="text-2xl font-semibold text-primary mb-2">
              {hijriDate?.fullDate}
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
          <Button size="lg" className="px-8 py-3">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Simple decorative elements */}
      <div className="absolute top-10 left-10 text-primary/10">
        <FiSun size={40} />
      </div>
      <div className="absolute top-20 right-20 text-secondary/10">
        <FiStar size={30} />
      </div>
      <div className="absolute bottom-10 left-20 text-primary/10">
        <FiStar size={25} />
      </div>

      {/* Simple scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <FiArrowDown className="text-muted-foreground" size={24} />
      </div>
    </div>
  );
};

export default Hero;
