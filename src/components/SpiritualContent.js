import React, { useState } from 'react';
import { dailyHadith, quranicVerse } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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
    <section id="spiritual-content" className="py-16 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Daily Spiritual Content
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enrich your day with wisdom from the Quran and Hadith
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Hadith Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Decorative quote marks */}
            <div className="absolute top-4 right-4 text-primary/20 text-6xl">
              "
            </div>
            
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <CardTitle className="text-2xl">
                  Daily Hadith
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Arabic Text */}
              <div>
                <p className="text-xl md:text-2xl font-arabic text-right leading-relaxed text-foreground">
                  {currentHadith.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  "{currentHadith.english}"
                </p>
              </div>

              {/* Source Information */}
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Source:</span>
                    <p className="text-muted-foreground">{currentHadith.source}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Narrator:</span>
                    <p className="text-muted-foreground">{currentHadith.narrator}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Book:</span>
                    <p className="text-muted-foreground">{currentHadith.bookNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Hadith:</span>
                    <p className="text-muted-foreground">{currentHadith.hadithNumber}</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentHadith.explanation}
                </p>
              </div>

              {/* Refresh Button */}
              <Button
                onClick={handleRefreshHadith}
                disabled={isRefreshing}
                variant="secondary"
                className="w-full"
              >
                <span className={isRefreshing ? 'animate-spin' : ''}>
                  🔄
                </span>
                {isRefreshing ? 'Loading...' : 'Next Hadith'}
              </Button>
            </CardContent>
          </Card>

          {/* Quranic Reflection Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Decorative Islamic pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <CardTitle className="text-2xl">
                  Quranic Reflection
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Surah and Verse Info */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-4 text-center">
                <h4 className="text-lg font-semibold mb-1">{quranicVerse.surah}</h4>
                <p className="text-sm opacity-90">Verse {quranicVerse.verse}</p>
              </div>

              {/* Arabic Text */}
              <div>
                <p className="text-xl md:text-2xl font-arabic text-right leading-relaxed text-foreground">
                  {quranicVerse.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  "{quranicVerse.english}"
                </p>
              </div>

              {/* Reflection */}
              <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-4">
                <h5 className="font-semibold text-foreground mb-2">Reflection</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {quranicVerse.translation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <span>▶️</span>
                  Listen
                </Button>
                <Button variant="outline" className="flex-1">
                  <span>📖</span>
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <Badge variant="outline" className="px-6 py-3 text-base">
            May Allah guide us all to the straight path
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default SpiritualContent;
