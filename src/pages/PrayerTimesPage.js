import React, { useState } from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const PrayerTimesPage = () => {
  const [mawaqitError, setMawaqitError] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Prayer Times – Budapest Mosque</h1>
          <p className="text-lg text-muted-foreground">Live timetable via Mawaqit</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Mawaqit Prayer Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full border border-border rounded-lg overflow-hidden">
              <div className="relative w-full h-[800px] overflow-hidden">
                <iframe
                  title="Mawaqit"
                  src="https://mawaqit.net/en/m/budapest"
                  className="absolute top-0 left-[-30px] w-[calc(100%+90px)] h-full"
                  scrolling="no"
                  style={{ overflow: 'hidden' }}
                  onWheel={(e) => e.preventDefault()}
                  onTouchMove={(e) => e.preventDefault()}
                  loading="lazy"
                  onError={() => setMawaqitError(true)}
                />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground text-center">
              {mawaqitError && (
                <div className="mb-2">The embedded site could not be displayed in your browser.</div>
              )}
              <a
                href="https://mawaqit.net/en/m/budapest"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Click here to open Mawaqit
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrayerTimesPage;
