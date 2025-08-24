import React, { useState, useEffect } from 'react';
import { getHijriDate, getIslamicGreeting } from '../utils/islamicUtils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const Hero = () => {
  const [hijriDate, setHijriDate] = useState(null);
  const [greeting, setGreeting] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setHijriDate(getHijriDate());
    setGreeting(getIslamicGreeting());
    setIsVisible(true);
  }, []);

  return (
    <div className="hero min-h-[80vh] bg-gradient-to-br from-primary/5 via-background to-secondary/5 islamic-pattern-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="hero-content text-center relative z-10">
        <div className={`max-w-5xl transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Arabic greeting with enhanced typography */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6 font-arabic leading-tight tracking-wide animate-fade-in">
              {greeting?.arabic}
            </h1>
            <div className="inline-block">
              <p className="text-2xl md:text-3xl text-muted-foreground font-medium bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent animate-slide-up">
                {greeting?.greeting}
              </p>
            </div>
          </div>
          
          {/* Welcome message with enhanced styling */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight animate-slide-up delay-300">
              Welcome to our{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Islamic Community Platform
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up delay-500">
              A place where faith, community, and knowledge come together. 
              Connect with fellow Muslims, access prayer times, and enrich your spiritual journey.
            </p>
          </div>
          
          {/* Enhanced Hijri date display */}
          <div className="mb-16 animate-slide-up delay-700">
            <Badge variant="outline" className="text-lg px-8 py-4 mb-6 border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
              <span className="mr-2">📅</span>
              Today's Islamic Date
            </Badge>
            <div className="bg-card/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-border/50 hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <p className="text-3xl font-bold text-primary mb-3">
                {hijriDate?.fullDate}
              </p>
              <p className="text-muted-foreground text-lg">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Enhanced call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up delay-1000">
            <Button 
              size="lg" 
              className="text-xl px-10 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            >
              <span className="mr-2">🚀</span>
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-xl px-10 py-6 rounded-2xl border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="mr-2">📚</span>
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced decorative elements with better animations */}
      <div className="absolute top-16 left-16 text-primary/20 text-7xl animate-bounce-slow">
        🌙
      </div>
      <div className="absolute top-32 right-24 text-secondary/20 text-5xl animate-bounce-slow delay-1000">
        ⭐
      </div>
      <div className="absolute bottom-24 left-24 text-primary/20 text-4xl animate-bounce-slow delay-2000">
        ⭐
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
