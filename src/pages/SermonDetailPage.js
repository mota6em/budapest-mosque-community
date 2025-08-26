import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { sermons } from '../data/sermons';
import { getYouTubeVideoId } from '../lib/utils';
import { FiArrowLeft, FiCalendar, FiUser, FiYoutube, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SermonDetailPage = () => {
  const { id } = useParams();
  const sermonId = Number(id);
  const index = useMemo(() => sermons.findIndex(s => s.id === sermonId), [sermonId]);
  const sermon = index >= 0 ? sermons[index] : null;
  const prev = index > 0 ? sermons[index - 1] : null;
  const next = index < sermons.length - 1 ? sermons[index + 1] : null;

  if (!sermon) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Sermon not found</h1>
          <Link to="/sermons"><Button variant="outline">Back to sermons</Button></Link>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(sermon.link);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/sermons" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <FiArrowLeft /> Back to sermons
          </Link>
          <div className="flex items-center gap-2">
            {prev && (
              <Link to={`/sermons/${prev.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FiChevronLeft /> Prev
                </Button>
              </Link>
            )}
            {next && (
              <Link to={`/sermons/${next.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  Next <FiChevronRight />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted">
                {videoId && (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={sermon.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{sermon.language}</Badge>
                  <Badge variant="outline">Imam: {sermon.imam}</Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{sermon.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1"><FiCalendar size={14} /><span>{new Date(sermon.date).toLocaleDateString()}</span></div>
                  <div className="flex items-center gap-1"><FiUser size={14} /><span>{sermon.imam}</span></div>
                </div>
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <p>{sermon.description}</p>
                </div>
                <div className="mt-6">
                  <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer">
                    <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                      <FiYoutube size={18} /> Watch on YouTube
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Language</span><span>{sermon.language}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Imam</span><span>{sermon.imam}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{new Date(sermon.date).toLocaleDateString()}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SermonDetailPage;


