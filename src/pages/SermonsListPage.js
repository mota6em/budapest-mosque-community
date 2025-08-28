import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { getYouTubeThumbnail, getYouTubeVideoId } from '../lib/utils';
import { FiCalendar, FiUser, FiYoutube, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { sermons as allSermons } from '../data/sermons';

const SermonCard = ({ sermon }) => {
  const thumb = useMemo(() => getYouTubeThumbnail(sermon.link, 'hqdefault'), [sermon.link]);
  const videoId = useMemo(() => getYouTubeVideoId(sermon.link), [sermon.link]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-44 bg-muted">
        {isPlaying && videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={sermon.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            {thumb && (
              <img src={thumb} alt={sermon.title} className="w-full h-full object-cover" />
            )}
            <Link
              to={`/sermons/${sermon.id}`}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                <FiYoutube size={24} />
              </div>
            </Link>
          </>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{sermon.language}</Badge>
          <Badge variant="outline">Imam: {sermon.imam}</Badge>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{sermon.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{sermon.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1"><FiCalendar size={14} /><span>{new Date(sermon.date).toLocaleDateString()}</span></div>
          <div className="flex items-center gap-1"><FiUser size={14} /><span>{sermon.imam}</span></div>
        </div>
      </CardContent>
    </Card>
  );
};

const SermonsListPage = () => {
  const [language, setLanguage] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const sermons = allSermons;

  const filtered = useMemo(() => {
    if (language === 'All') return sermons;
    return sermons.filter(s => s.language?.toLowerCase().startsWith(language.toLowerCase()));
  }, [sermons, language]);

  const featured = filtered[0];
  const restAll = filtered.slice(1);

  const totalPages = Math.max(1, Math.ceil(restAll.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const rest = restAll.slice(start, end);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Jumaa Sermons</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Weekly Friday khutbahs from our mosque. Watch the latest sermon and browse previous ones.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {['All', 'Arabic', 'English', 'Hungarian'].map((lng) => (
            <Button
              key={lng}
              variant={language === lng ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setLanguage(lng); setPage(1); }}
            >
              {lng}
            </Button>
          ))}
        </div>

        {featured && (
          <Card className="overflow-hidden mb-10">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-full bg-muted">
                <Link to={`/sermons/${featured.id}`} className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                    <FiYoutube size={28} />
                  </div>
                </Link>
                {getYouTubeThumbnail(featured.link, 'sddefault') && (
                  <img src={getYouTubeThumbnail(featured.link, 'sddefault')} alt={featured.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{featured.language}</Badge>
                  <Badge variant="outline">Imam: {featured.imam}</Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{featured.title}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{featured.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1"><FiCalendar size={14} /><span>{new Date(featured.date).toLocaleDateString()}</span></div>
                  <div className="flex items-center gap-1"><FiUser size={14} /><span>{featured.imam}</span></div>
                </div>
                <Link to={`/sermons/${featured.id}`}>
                  <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                    <FiYoutube size={18} /> Watch sermon
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((s) => (
            <SermonCard key={s.id} sermon={s} />
          ))}
        </div>

        {restAll.length > pageSize && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              <FiChevronLeft /> Prev
            </Button>
            <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Next <FiChevronRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SermonsListPage;


