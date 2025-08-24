import React from 'react';

const QuickNavigation = () => {
  const navigationItems = [
    {
      icon: '📖',
      title: 'Islamic Guide',
      subtitle: 'Learn & Grow',
      description: 'Access comprehensive Islamic knowledge, rulings, and educational resources',
      color: 'from-islamic-primary to-islamic-primary-dark',
      bgColor: 'bg-islamic-primary/10',
      textColor: 'text-islamic-primary'
    },
    {
      icon: '❤️',
      title: 'Donations',
      subtitle: 'Give Back',
      description: 'Support charitable causes and contribute to community development',
      color: 'from-islamic-secondary to-islamic-secondary-dark',
      bgColor: 'bg-islamic-secondary/10',
      textColor: 'text-islamic-secondary'
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
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-islamic-text-primary mb-4">
            Quick Navigation
          </h2>
          <p className="text-lg text-islamic-text-secondary max-w-2xl mx-auto">
            Access all platform features and services with ease
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="group islamic-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`${item.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{item.icon}</span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-islamic-text-primary mb-2 group-hover:text-islamic-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className={`text-lg font-semibold ${item.textColor} mb-3`}>
                  {item.subtitle}
                </p>
                <p className="text-sm text-islamic-text-secondary leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-islamic-text-secondary font-medium">
                    Click to explore
                  </span>
                  <div className={`${item.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current ${item.textColor} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-islamic-primary to-islamic-primary-dark rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Join Our Community
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Connect with fellow Muslims, access resources, and grow together in faith. 
              Your spiritual journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-islamic-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
                Get Started
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickNavigation;
