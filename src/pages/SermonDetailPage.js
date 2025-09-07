import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { db } from '../lib/supabase';
import { getYouTubeVideoId } from '../lib/utils';
import { FiArrowLeft, FiCalendar, FiUser, FiYoutube, FiChevronLeft, FiChevronRight, FiLink, FiRefreshCw } from 'react-icons/fi';

const SermonDetailPage = () => {
  const { id } = useParams();
  const [sermon, setSermon] = useState(null);
  const [allSermons, setAllSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Load sermon data
  const loadSermonData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all sermons to get navigation
      const { data: sermonsData, error: sermonsError } = await db.query("joumaa");
      
      if (sermonsError) {
        console.error('Error loading sermons:', sermonsError);
        setError('Failed to load sermons. Please try again.');
        return;
      }

      // Sort by date descending (newest first)
      const sortedSermons = (sermonsData || []).sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      setAllSermons(sortedSermons);
      
      // Find the specific sermon
      const foundSermon = sortedSermons.find(s => s.id === id);
      if (!foundSermon) {
        setError('Sermon not found');
        return;
      }

      setSermon(foundSermon);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSermonData();
  }, [id]);

  // Get navigation data
  const { prev, next } = useMemo(() => {
    if (!sermon || !allSermons.length) return { prev: null, next: null };
    
    const currentIndex = allSermons.findIndex(s => s.id === sermon.id);
    if (currentIndex === -1) return { prev: null, next: null };
    
    return {
      prev: currentIndex > 0 ? allSermons[currentIndex - 1] : null,
      next: currentIndex < allSermons.length - 1 ? allSermons[currentIndex + 1] : null
    };
  }, [sermon, allSermons]);

  const videoId = useMemo(() => {
    return sermon?.link ? getYouTubeVideoId(sermon.link) : null;
  }, [sermon?.link]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading sermon...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-10 text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto mb-6">
            <h1 className="text-2xl font-bold mb-4 text-destructive">{error}</h1>
            <Button onClick={loadSermonData} className="flex items-center gap-2 mx-auto mb-4">
              <FiRefreshCw size={16} />
              Try Again
            </Button>
          </div>
          <Link to="/sermons">
            <Button variant="outline">Back to sermons</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Sermon not found</h1>
          <Link to="/sermons">
            <Button variant="outline">Back to sermons</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between max-w-4xl mx-auto">
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

        <div className="max-w-4xl mx-auto">
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
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{sermon.language || 'English'}</Badge>
                  <Badge variant="outline">Imam: {sermon.imam || 'Unknown'}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyLink} className="flex items-center gap-2">
                    <FiLink /> {copied ? 'Copied!' : 'Copy link'}
                  </Button>
                  {videoId && (
                    <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer">
                      <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                        <FiYoutube size={18} /> YouTube
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{sermon.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <FiCalendar size={14} />
                  <span>{sermon.date ? new Date(sermon.date).toLocaleDateString() : 'Date not set'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUser size={14} />
                  <span>{sermon.imam || 'Unknown'}</span>
                </div>
              </div>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                <p>{sermon.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SermonDetailPage;


