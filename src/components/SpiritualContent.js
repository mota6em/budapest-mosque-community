import React, { useState } from 'react';
import { dailyHadith, quranicVerse } from '../data/mockData';

const SpiritualContent = () => {
  const [currentHadith, setCurrentHadith] = useState(dailyHadith);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshHadith = () => {
    setIsRefreshing(true);
    // Simulate loading new hadith
    setTimeout(() => {
      // In a real app, this would fetch a new hadith from an API
      setCurrentHadith({
        ...dailyHadith,
        arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
        english: "Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.",
        source: "Sahih Muslim",
        bookNumber: "2699",
        hadithNumber: "26",
        narrator: "Abu Huraira",
        explanation: "This hadith emphasizes the great virtue of seeking knowledge in Islam and the divine assistance provided to those who pursue education."
      });
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-islamic-text-primary mb-4">
            Daily Spiritual Content
          </h2>
          <p className="text-lg text-islamic-text-secondary max-w-2xl mx-auto">
            Enrich your day with wisdom from the Quran and Hadith
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Hadith Card */}
          <div className="islamic-card p-8 relative overflow-hidden">
            {/* Decorative quote marks */}
            <div className="absolute top-4 right-4 text-islamic-primary/20 text-6xl">
              "
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">📖</span>
                <h3 className="text-2xl font-bold text-islamic-text-primary">
                  Daily Hadith
                </h3>
              </div>

              {/* Arabic Text */}
              <div className="mb-6">
                <p className="text-xl md:text-2xl font-arabic text-right leading-relaxed text-islamic-text-primary">
                  {currentHadith.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="mb-6">
                <p className="text-lg leading-relaxed text-islamic-text-secondary italic">
                  "{currentHadith.english}"
                </p>
              </div>

              {/* Source Information */}
              <div className="bg-islamic-primary/5 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-islamic-text-primary">Source:</span>
                    <p className="text-islamic-text-secondary">{currentHadith.source}</p>
                  </div>
                  <div>
                    <span className="font-medium text-islamic-text-primary">Narrator:</span>
                    <p className="text-islamic-text-secondary">{currentHadith.narrator}</p>
                  </div>
                  <div>
                    <span className="font-medium text-islamic-text-primary">Book:</span>
                    <p className="text-islamic-text-secondary">{currentHadith.bookNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-islamic-text-primary">Hadith:</span>
                    <p className="text-islamic-text-secondary">{currentHadith.hadithNumber}</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-6">
                <p className="text-sm text-islamic-text-secondary leading-relaxed">
                  {currentHadith.explanation}
                </p>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefreshHadith}
                disabled={isRefreshing}
                className="flex items-center gap-2 bg-islamic-secondary text-white px-4 py-2 rounded-lg hover:bg-islamic-secondary-dark transition-colors duration-200 disabled:opacity-50"
              >
                <span className={isRefreshing ? 'animate-spin' : ''}>
                  {isRefreshing ? '🔄' : '🔄'}
                </span>
                {isRefreshing ? 'Loading...' : 'Next Hadith'}
              </button>
            </div>
          </div>

          {/* Quranic Reflection Card */}
          <div className="islamic-card p-8 relative overflow-hidden">
            {/* Decorative Islamic pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-islamic-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">📖</span>
                <h3 className="text-2xl font-bold text-islamic-text-primary">
                  Quranic Reflection
                </h3>
              </div>

              {/* Surah and Verse Info */}
              <div className="bg-gradient-to-r from-islamic-primary to-islamic-primary-dark text-white rounded-xl p-4 mb-6 text-center">
                <h4 className="text-lg font-semibold mb-1">{quranicVerse.surah}</h4>
                <p className="text-sm opacity-90">Verse {quranicVerse.verse}</p>
              </div>

              {/* Arabic Text */}
              <div className="mb-6">
                <p className="text-xl md:text-2xl font-arabic text-right leading-relaxed text-islamic-text-primary">
                  {quranicVerse.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="mb-6">
                <p className="text-lg leading-relaxed text-islamic-text-secondary italic">
                  "{quranicVerse.english}"
                </p>
              </div>

              {/* Reflection */}
              <div className="bg-gradient-to-r from-islamic-secondary/10 to-islamic-primary/10 rounded-xl p-4 mb-6">
                <h5 className="font-semibold text-islamic-text-primary mb-2">Reflection</h5>
                <p className="text-sm text-islamic-text-secondary leading-relaxed">
                  {quranicVerse.translation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-islamic-primary text-white px-4 py-2 rounded-lg hover:bg-islamic-primary-dark transition-colors duration-200">
                  <span>▶️</span>
                  Listen
                </button>
                <button className="flex items-center gap-2 border border-islamic-primary text-islamic-primary px-4 py-2 rounded-lg hover:bg-islamic-primary hover:text-white transition-all duration-200">
                  <span>📖</span>
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-islamic-primary/10 text-islamic-primary px-6 py-3 rounded-full">
            <span className="text-sm font-medium">May Allah guide us all to the straight path</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiritualContent;
