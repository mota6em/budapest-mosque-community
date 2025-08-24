import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const QuickNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigationItems = [
    {
      icon: '📖',
      title: 'Islamic Guide',
      subtitle: 'Learn & Grow',
      description: 'Access comprehensive Islamic knowledge, rulings, and educational resources',
      color: 'from-primary to-primary/80',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      icon: '❤️',
      title: 'Donations',
      subtitle: 'Give Back',
      description: 'Support charitable causes and contribute to community development',
      color: 'from-secondary to-secondary/80',
      bgColor: 'bg-secondary/10',
      textColor: 'text-secondary',
      gradient: 'from-secondary/20 to-secondary/5'
    },
    {
      icon: '🕐',
      title: 'Prayer Times',
      subtitle: 'Prayer Schedule',
      description: 'Get accurate prayer times for your location with notifications',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600',
      gradient: 'from-emerald-500/20 to-emerald-500/5'
    },
    {
      icon: '📅',
      title: 'Calendar',
      subtitle: 'Community Events',
      description: 'Stay updated with Islamic events, classes, and community activities',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-600',
      gradient: 'from-blue-500/20 to-blue-500/5'
    },
    {
      icon: '👥',
      title: 'Opportunities',
      subtitle: 'Volunteer',
      description: 'Find volunteer opportunities and ways to serve the community',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-600',
      gradient: 'from-purple-500/20 to-purple-500/5'
    },
    {
      icon: '📚',
      title: 'Stories',
      subtitle: 'Inspiring Stories',
      description: 'Read inspiring stories from the Muslim community worldwide',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-600',
      gradient: 'from-orange-500/20 to-orange-500/5'
    }
  ];

  return (
    <section id="navigation" className="py-20 px-6 bg-gradient-to-br from-base-200 to-base-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-56 h-56 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/30">
              🧭 Quick Access
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Platform Navigation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Access all platform features and services with ease
            </p>
          </div>
        </div>

        {/* Enhanced Navigation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {navigationItems.map((item, index) => (
            <Card
              key={index}
              className="group hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden glass hover:shadow-2xl hover:shadow-primary/20 border-border/50"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Enhanced Icon */}
              <CardHeader className="relative z-10">
                <div className={`${item.bgColor} w-20 h-20 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-4xl">{item.icon}</span>
                </div>

                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300 mb-2">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <Badge variant="outline" className={`${item.textColor} border-current px-4 py-2 text-base font-semibold`}>
                  {item.subtitle}
                </Badge>
                
                <p className="text-muted-foreground leading-relaxed text-base">
                  {item.description}
                </p>

                {/* Enhanced Arrow indicator */}
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-muted-foreground font-medium">
                    Click to explore
                  </span>
                  <div className={`${item.textColor} group-hover:translate-x-2 transition-transform duration-300`}>
                    <span className="text-2xl">→</span>
                  </div>
                </div>
              </CardContent>

              {/* Enhanced Hover effect border */}
              <div className={`absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-current ${item.textColor} opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
            </Card>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground border-0 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-3xl font-bold mb-4">Join Our Community</CardTitle>
              <Separator className="bg-primary-foreground/20 mb-6" />
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with fellow Muslims, access resources, and grow together in faith. 
                Your spiritual journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-14 text-lg font-semibold px-10 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="mr-3">🚀</span>
                  Get Started Today
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-14 text-lg font-semibold px-10 py-6 rounded-2xl border-primary-foreground/30 hover:border-primary-foreground/50 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="mr-3">📚</span>
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
