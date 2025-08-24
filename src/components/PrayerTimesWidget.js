import React, { useState, useEffect } from 'react';
import { getPrayerTimes, getPrayerCountdown } from '../utils/islamicUtils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const PrayerTimesWidget = () => {
  const [prayerData, setPrayerData] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePrayerData = () => {
      const data = getPrayerTimes();
      setPrayerData(data);
      
      const updateCountdown = () => {
        const countdownData = getPrayerCountdown(data.nextPrayerTime);
        setCountdown(countdownData);
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 60000); // Update every minute
      
      return () => clearInterval(interval);
    };

    updatePrayerData();
    setIsVisible(true);
  }, []);

  if (!prayerData) return null;

  const { times, nextPrayer, nextPrayerTime, location } = prayerData;

  const getPrayerIcon = (prayerName) => {
    switch (prayerName) {
      case 'Fajr':
      case 'Sunrise':
        return <span className="text-3xl">🌅</span>;
      case 'Dhuhr':
      case 'Asr':
        return <span className="text-3xl">🕐</span>;
      case 'Maghrib':
      case 'Isha':
        return <span className="text-3xl">🌙</span>;
      default:
        return <span className="text-3xl">🕐</span>;
    }
  };

  return (
    <section id="prayer-times" className="py-20 px-6 bg-gradient-to-br from-base-200 to-base-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/30">
              🕌 Prayer Times
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Daily Prayer Schedule
            </h2>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <span className="text-2xl">📍</span>
              <span className="text-xl font-medium">{location}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Next Prayer Highlight */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground border-0 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-3xl font-bold mb-2">Next Prayer</CardTitle>
              <Separator className="bg-primary-foreground/20 mb-4" />
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <div className="text-6xl md:text-8xl font-bold mb-8 font-arabic tracking-wide">
                {nextPrayer}
              </div>
              <div className="text-3xl md:text-4xl mb-8 font-light">
                {nextPrayerTime}
              </div>
              
              {countdown && (
                <div className="bg-primary-foreground/20 rounded-3xl p-8 backdrop-blur-sm border border-primary-foreground/30">
                  <p className="text-lg mb-6 font-medium">Time until {nextPrayer}</p>
                  <div className="countdown font-mono text-5xl font-bold flex justify-center gap-8">
                    <div className="text-center">
                      <div className="bg-primary-foreground/30 rounded-2xl px-6 py-4 min-w-[5rem]">
                        {countdown.hours.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm mt-3 opacity-80">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary-foreground/30 rounded-2xl px-6 py-4 min-w-[5rem]">
                        {countdown.minutes.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm mt-3 opacity-80">Minutes</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Prayer Times Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {Object.entries(times).map(([prayer, time], index) => (
            <Card
              key={prayer}
              className={`group hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                prayer === nextPrayer 
                  ? 'ring-2 ring-primary ring-offset-4 bg-primary text-primary-foreground shadow-2xl' 
                  : 'hover:shadow-xl hover:shadow-primary/20'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                prayer === nextPrayer ? 'hidden' : ''
              }`}></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {getPrayerIcon(prayer)}
                </div>
                <CardTitle className={`text-xl font-bold ${prayer === nextPrayer ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {prayer}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0 relative z-10">
                <div className={`text-2xl font-bold mb-3 ${prayer === nextPrayer ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                  {time}
                </div>
                {prayer === nextPrayer && (
                  <Badge variant="secondary" className="bg-primary-foreground text-primary font-bold px-4 py-2 text-sm">
                    Next Prayer
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Prayer Reminders */}
        <div className="text-center">
          <Card className="bg-card/90 backdrop-blur-md border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
            <CardContent className="pt-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-2xl">💡</span>
                <h4 className="text-2xl font-bold text-foreground">Prayer Reminders</h4>
              </div>
              <Separator className="mb-6" />
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="px-6 py-3 text-base border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  🧘 Make Wudu
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-base border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  🧭 Face Qiblah
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-base border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  🧠 Be Mindful
                </Badge>
                <Badge variant="outline" className="px-6 py-3 text-base border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  ⏰ On Time
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimesWidget;
