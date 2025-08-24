import React, { useState, useEffect } from 'react';
import { getPrayerTimes, getPrayerCountdown } from '../utils/islamicUtils';

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

  const getPrayerColor = (prayerName) => {
    if (prayerName === nextPrayer) {
      return 'bg-gradient-to-r from-islamic-primary to-islamic-primary-dark text-white';
    }
    return 'bg-white hover:bg-gray-50';
  };

  const getPrayerTextColor = (prayerName) => {
    if (prayerName === nextPrayer) {
      return 'text-white';
    }
    return 'text-islamic-text-primary';
  };

  const getPrayerTimeColor = (prayerName) => {
    if (prayerName === nextPrayer) {
      return 'text-white/90';
    }
    return 'text-islamic-text-secondary';
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-islamic-text-primary mb-4">
            Prayer Times
          </h2>
          <div className="flex items-center justify-center gap-2 text-islamic-text-secondary">
            <span className="text-xl">📍</span>
            <span className="text-lg">{location}</span>
          </div>
        </div>

        {/* Next Prayer Highlight */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-islamic-primary to-islamic-primary-dark rounded-3xl p-8 text-white text-center shadow-xl">
            <h3 className="text-xl font-medium mb-2">Next Prayer</h3>
            <div className="text-4xl md:text-6xl font-bold mb-4">{nextPrayer}</div>
            <div className="text-2xl md:text-3xl mb-6">{nextPrayerTime}</div>
            
            {countdown && (
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-sm mb-2">Time until {nextPrayer}</p>
                <div className="flex justify-center gap-4 text-2xl font-bold">
                  <div className="text-center">
                    <div className="bg-white/30 rounded-lg px-3 py-2">
                      {countdown.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm mt-1">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/30 rounded-lg px-3 py-2">
                      {countdown.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm mt-1">Minutes</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(times).map(([prayer, time]) => (
            <div
              key={prayer}
              className={`${getPrayerColor(prayer)} rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <div className="flex justify-center mb-3">
                {getPrayerIcon(prayer)}
              </div>
              <h4 className={`font-semibold mb-2 ${getPrayerTextColor(prayer)}`}>
                {prayer}
              </h4>
              <div className={`text-lg font-bold ${getPrayerTimeColor(prayer)}`}>
                {time}
              </div>
              {prayer === nextPrayer && (
                <div className="mt-2">
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    Next
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Prayer Reminders */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 inline-block">
            <h4 className="text-lg font-semibold text-islamic-text-primary mb-3">
              Prayer Reminders
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-islamic-primary/10 text-islamic-primary px-3 py-1 rounded-full text-sm">
                Make Wudu
              </span>
              <span className="bg-islamic-primary/10 text-islamic-primary px-3 py-1 rounded-full text-sm">
                Face Qiblah
              </span>
              <span className="bg-islamic-primary/10 text-islamic-primary px-3 py-1 rounded-full text-sm">
                Be Mindful
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimesWidget;
