import React, { useState, useEffect } from 'react';
import { getPrayerTimes, getPrayerCountdown } from '../utils/islamicUtils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const PrayerTimesWidget = () => {
  const [prayerData, setPrayerData] = useState(null);
  const [countdown, setCountdown] = useState(null);

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
  }, []);

  if (!prayerData) return null;

  const { times, nextPrayer, nextPrayerTime, location } = prayerData;

  const getPrayerIcon = (prayerName) => {
    switch (prayerName) {
      case 'Fajr':
      case 'Sunrise':
        return <span className="text-2xl">🌅</span>;
      case 'Dhuhr':
      case 'Asr':
        return <span className="text-2xl">🕐</span>;
      case 'Maghrib':
      case 'Isha':
        return <span className="text-2xl">🌙</span>;
      default:
        return <span className="text-2xl">🕐</span>;
    }
  };

  return (
    <section id="prayer-times" className="py-16 px-6 bg-gradient-to-br from-base-200 to-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Prayer Times
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span className="text-xl">📍</span>
            <span className="text-lg">{location}</span>
          </div>
        </div>

        {/* Next Prayer Highlight */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-medium">Next Prayer</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl md:text-7xl font-bold mb-6">{nextPrayer}</div>
              <div className="text-3xl md:text-4xl mb-8">{nextPrayerTime}</div>
              
              {countdown && (
                <div className="bg-primary-foreground/20 rounded-2xl p-6 backdrop-blur-sm">
                  <p className="text-sm mb-4">Time until {nextPrayer}</p>
                  <div className="countdown font-mono text-4xl font-bold">
                    <span style={{"--value": countdown.hours}}></span>h
                    <span style={{"--value": countdown.minutes}}></span>m
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {Object.entries(times).map(([prayer, time]) => (
            <Card
              key={prayer}
              className={`hover:scale-105 transition-all duration-300 ${
                prayer === nextPrayer 
                  ? 'ring-2 ring-primary ring-offset-2 bg-primary text-primary-foreground' 
                  : 'hover:shadow-lg'
              }`}
            >
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  {getPrayerIcon(prayer)}
                </div>
                <CardTitle className={`text-lg ${prayer === nextPrayer ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {prayer}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className={`text-xl font-bold ${prayer === nextPrayer ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                  {time}
                </div>
                {prayer === nextPrayer && (
                  <Badge variant="secondary" className="mt-2 bg-primary-foreground text-primary">
                    Next
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prayer Reminders */}
        <div className="text-center">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Prayer Reminders
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  Make Wudu
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Face Qiblah
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Be Mindful
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
