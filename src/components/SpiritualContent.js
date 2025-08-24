import React, { useState } from 'react';
import { dailyHadith, quranicVerse } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const SpiritualContent = () => {
  const [currentHadith, setCurrentHadith] = useState(dailyHadith);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <section id="spiritual-content" className="py-20 px-6 bg-base-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-secondary/30">
              📖 Daily Content
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Daily Spiritual Content
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Enrich your day with wisdom from the Quran and Hadith
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Enhanced Daily Hadith Card */}
          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 group">
            {/* Decorative quote marks */}
            <div className="absolute top-6 right-6 text-primary/20 text-8xl group-hover:scale-110 transition-transform duration-500">
              "
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📖</span>
                </div>
                <CardTitle className="text-3xl font-bold">
                  Daily Hadith
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-8">
              {/* Arabic Text */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                <p className="text-2xl md:text-3xl font-arabic text-right leading-relaxed text-foreground font-medium">
                  {currentHadith.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-2xl p-6 border border-secondary/10">
                <p className="text-xl leading-relaxed text-foreground italic font-medium">
                  "{currentHadith.english}"
                </p>
              </div>

              {/* Enhanced Source Information */}
              <div className="bg-muted/50 rounded-2xl p-6 border border-border/50">
                <h4 className="font-semibold text-foreground mb-4 text-lg">Source Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">📚</span>
                      <span className="font-medium text-foreground">Source:</span>
                    </div>
                    <p className="text-muted-foreground ml-6">{currentHadith.source}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">👤</span>
                      <span className="font-medium text-foreground">Narrator:</span>
                    </div>
                    <p className="text-muted-foreground ml-6">{currentHadith.narrator}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">📖</span>
                      <span className="font-medium text-foreground">Book:</span>
                    </div>
                    <p className="text-muted-foreground ml-6">{currentHadith.bookNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">🔢</span>
                      <span className="font-medium text-foreground">Hadith:</span>
                    </div>
                    <p className="text-muted-foreground ml-6">{currentHadith.hadithNumber}</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Explanation */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                <h5 className="font-semibold text-foreground mb-3 text-lg">Explanation</h5>
                <p className="text-muted-foreground leading-relaxed">
                  {currentHadith.explanation}
                </p>
              </div>

              {/* Enhanced Refresh Button */}
              <Button
                onClick={handleRefreshHadith}
                disabled={isRefreshing}
                variant="secondary"
                size="lg"
                className="w-full h-14 text-lg font-semibold group-hover:scale-105 transition-all duration-300"
              >
                <span className={`mr-3 ${isRefreshing ? 'animate-spin' : ''}`}>
                  🔄
                </span>
                {isRefreshing ? 'Loading New Hadith...' : 'Get Next Hadith'}
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Quranic Reflection Card */}
          <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 group">
            {/* Decorative Islamic pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-20 translate-x-20 group-hover:scale-110 transition-transform duration-500"></div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📖</span>
                </div>
                <CardTitle className="text-3xl font-bold">
                  Quranic Reflection
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-8">
              {/* Enhanced Surah and Verse Info */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 text-center shadow-lg">
                <h4 className="text-2xl font-bold mb-2">{quranicVerse.surah}</h4>
                <Separator className="bg-primary-foreground/20 mb-3" />
                <Badge variant="secondary" className="bg-primary-foreground text-primary font-bold px-4 py-2">
                  Verse {quranicVerse.verse}
                </Badge>
              </div>

              {/* Arabic Text */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                <p className="text-2xl md:text-3xl font-arabic text-right leading-relaxed text-foreground font-medium">
                  {quranicVerse.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-2xl p-6 border border-secondary/10">
                <p className="text-xl leading-relaxed text-foreground italic font-medium">
                  "{quranicVerse.english}"
                </p>
              </div>

              {/* Enhanced Reflection */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                <h5 className="font-semibold text-foreground mb-3 text-lg flex items-center gap-2">
                  <span>💭</span>
                  Reflection
                </h5>
                <p className="text-muted-foreground leading-relaxed">
                  {quranicVerse.translation}
                </p>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group-hover:scale-105 transition-all duration-300">
                  <span className="mr-2">▶️</span>
                  Listen to Recitation
                </Button>
                <Button variant="outline" size="lg" className="flex-1 h-14 text-lg font-semibold border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 group-hover:scale-105 transition-all duration-300">
                  <span className="mr-2">📖</span>
                  Read Full Surah
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Bottom Decoration */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500">
            <CardContent className="py-8">
              <Badge variant="outline" className="px-8 py-4 text-lg font-semibold border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <span className="mr-3">🤲</span>
                May Allah guide us all to the straight path
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SpiritualContent;
