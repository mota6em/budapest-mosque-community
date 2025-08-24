import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const QuickNavigation = () => {
  const navigationItems = [
    {
      icon: '📖',
      title: 'Islamic Guide',
      subtitle: 'Learn & Grow',
      description: 'Access comprehensive Islamic knowledge, rulings, and educational resources',
      color: 'from-primary to-primary/80',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary'
    },
    {
      icon: '❤️',
      title: 'Donations',
      subtitle: 'Give Back',
      description: 'Support charitable causes and contribute to community development',
      color: 'from-secondary to-secondary/80',
      bgColor: 'bg-secondary/10',
      textColor: 'text-secondary'
    },
    {
      icon: '🕐',
      title: 'Prayer Times',
      subtitle: 'Prayer Schedule',
      description: 'Get accurate prayer times for your location with notifications',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600'
    },
    {
      icon: '📅',
      title: 'Calendar',
      subtitle: 'Community Events',
      description: 'Stay updated with Islamic events, classes, and community activities',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-600'
    },
    {
      icon: '👥',
      title: 'Opportunities',
      subtitle: 'Volunteer',
      description: 'Find volunteer opportunities and ways to serve the community',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-600'
    },
    {
      icon: '📚',
      title: 'Stories',
      subtitle: 'Inspiring Stories',
      description: 'Read inspiring stories from the Muslim community worldwide',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <section id="navigation" className="py-16 px-6 bg-gradient-to-br from-base-200 to-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick Navigation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access all platform features and services with ease
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {navigationItems.map((item, index) => (
            <Card
              key={index}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden glass hover:shadow-2xl"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <CardHeader>
                {/* Icon */}
                <div className={`${item.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>

                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Badge variant="outline" className={`${item.textColor} border-current`}>
                  {item.subtitle}
                </Badge>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    Click to explore
                  </span>
                  <div className={`${item.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </CardContent>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-current ${item.textColor} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Join Our Community</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Connect with fellow Muslims, access resources, and grow together in faith. 
                Your spiritual journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickNavigation;
