import React, { useState } from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const PrayerTimesPage = () => {
  const [mawaqitError, setMawaqitError] = useState(false);
  const selectedMosqueUrl = 'https://mawaqit.net/en/m/budapest';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Prayer Times – Budapest Mosque</h1>
          <p className="text-lg text-muted-foreground">Live timetable via Mawaqit</p>
        </div>


        <div className="h-6" />

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Mawaqit Prayer Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full border border-border rounded-lg overflow-hidden">
              <div className="relative w-full h-[800px] overflow-hidden">
                <iframe
                  title="Mawaqit"
                  src={selectedMosqueUrl}
                  className="absolute top-0 left-[-30px] w-[calc(100%+80px)] h-full"
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
                href={selectedMosqueUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Click here to open Mawaqit
              </a>
              <div className="mt-2 text-xs">© Mawaqit</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrayerTimesPage;
