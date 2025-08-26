import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FiAlertTriangle, FiCrosshair, FiGlobe } from 'react-icons/fi';

const PrayerTimesPage = () => {
  const [mawaqitError, setMawaqitError] = useState(false);
  const [selectedMosqueUrl, setSelectedMosqueUrl] = useState('https://mawaqit.net/en/m/budapest');
  const [countryCode, setCountryCode] = useState('HU');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const [showSelector, setShowSelector] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Budapest');
  const mosques = useMemo(() => ([
    { name: 'Budapest Mosque', city: 'Budapest', url: 'https://mawaqit.net/en/m/budapest' },
    { name: 'Al Noor Mosque', city: 'Budapest', url: 'https://mawaqit.net/en/m/masjid-al-noor-budapest-1071-hungary' },
    { name: 'Al-Huda Mosque', city: 'Budapest', url: 'https://mawaqit.net/en/huda-budapest' },
    { name: 'Al-Taqwa Mosque', city: 'Budapest', url: 'https://mawaqit.net/en/m/al-taqwa-mecset-budapest-1082-hungary' },
    { name: 'Jakovali Hassan Paşa Mosque', city: 'Pécs', url: 'https://mawaqit.net/en/m/jakovali-hassan-pasa-mosque-pecs-7623-hungary' },
    { name: 'Szeged Mosque', city: 'Szeged', url: 'https://mawaqit.net/en/m/szeged-mosque-6722-hungary' },
    { name: 'Darusszalam Mosque', city: 'Budapest', url: 'https://mawaqit.net/en/-3' },
     { name: 'Tauhid Mosque', city: 'Budapest', url: 'https://mawaqit.net/en/-4' },
    { name: 'Al-Forqan Mosque', city: 'Pécs', url: 'https://mawaqit.net/en/masjid-lforqan-pecs-7621-hungary-1' },
     { name: 'Debrecen Timings', city: 'Debrecen', url: 'https://mawaqit.net/en/debrecen-timings-debrecen-4032-hungary' }
  ]), []); 

  const cities = useMemo(() => Array.from(new Set(mosques.map(m => m.city))), [mosques]);

  const filteredMosques = useMemo(() => mosques.filter(m => m.city === selectedCity), [mosques, selectedCity]);

  // Ensure selected mosque is within the chosen city
  React.useEffect(() => {
    if (!filteredMosques.some(m => m.url === selectedMosqueUrl)) {
      const first = filteredMosques[0] || mosques[0];
      if (first) setSelectedMosqueUrl(first.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const handleZipLookup = async () => {
    if (!countryCode || !zipCode) return;
    setError('');
    try {
      const res = await fetch(`https://api.zippopotam.us/${encodeURIComponent(countryCode)}/${encodeURIComponent(zipCode)}`);
      if (!res.ok) throw new Error('ZIP not found');
      // Intentionally not altering iframe; just validating input per requirement retention
    } catch (e) {
      setError('Could not resolve ZIP code. Please check and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Prayer Times – Budapest Mosque</h1>
          <p className="text-lg text-muted-foreground">Live timetable via Mawaqit</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between bg-muted/40 border border-border rounded-lg px-4 py-3">
            <div className="text-sm text-muted-foreground">
              Currently viewing: <span className="font-medium text-foreground">{mosques.find(m => m.url === selectedMosqueUrl)?.name} – {mosques.find(m => m.url === selectedMosqueUrl)?.city}</span>
            </div>
            <div className="shrink-0">
              <Button variant="outline" size="sm" onClick={() => setShowSelector(!showSelector)}>
                {showSelector ? 'Hide mosque selector' : 'Select other mosque'}
              </Button>
            </div>
          </div>
        </div>
        {showSelector && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Select Mosque</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">City</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Mosque</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={selectedMosqueUrl}
                    onChange={(e) => { setSelectedMosqueUrl(e.target.value); setMawaqitError(false); }}
                  >
                    {filteredMosques.map((m) => (
                      <option key={m.url} value={m.url}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="h-6" />

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Mawaqit Prayer Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full border border-border rounded-lg overflow-hidden">
              <div className="relative w-full h-[800px] overflow-hidden">
                <iframe
                  title="Mawaqit"
                  src={selectedMosqueUrl}
                  className="absolute top-0 left-[-30px] w-[calc(100%+60px)] h-full"
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
