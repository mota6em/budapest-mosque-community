import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiFilter, FiExternalLink, FiHeart, FiShare2, FiX, FiRefreshCw } from 'react-icons/fi';
import { db } from '../lib/supabase';

const CalendarPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Event categories (moved from mock data)
  const eventCategories = ['all', 'Prayer', 'Education', 'Community', 'Youth', 'Spiritual', 'Holiday'];

  // Load events from database
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: dbError } = await db.query("event");
      
      if (dbError) {
        console.error('Error loading events:', dbError);
        setError('Failed to load events. Please try again.');
        setEvents([]);
      } else {
        // Sort by date ascending (earliest first)
        const sortedEvents = (data || []).sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        );
        setEvents(sortedEvents);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Check for event ID in URL params
  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId && events.length > 0) {
      const event = events.find(e => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [searchParams, events]);

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.type === selectedCategory;
    return matchesCategory;
  });

  // Convert events to FullCalendar format
  const getFullCalendarEvents = (events) => {
    return events.map(event => ({
      id: event.id.toString(),
      title: event.title,
      start: event.date,
      end: event.date,
      extendedProps: {
        description: event.description,
        type: event.type,
        image_url: event.image_url,
      },
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      textColor: '#ffffff'
    }));
  };

  const calendarEvents = getFullCalendarEvents(filteredEvents);

  const handleEventClick = (clickInfo) => {
    const eventId = clickInfo.event.id;
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleDateClick = (dateClickInfo) => {
    const clickedDate = dateClickInfo.dateStr;
    const eventsOnDate = filteredEvents.filter(event => event.date === clickedDate);
    if (eventsOnDate.length > 0) {
      setSelectedEvent(eventsOnDate[0]);
    }
  };

  // Helper functions (moved from mock data)
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Prayer': return 'bg-blue-500 text-white';
      case 'Education': return 'bg-green-500 text-white';
      case 'Community': return 'bg-purple-500 text-white';
      case 'Youth': return 'bg-orange-500 text-white';
      case 'Spiritual': return 'bg-indigo-500 text-white';
      case 'Holiday': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'special': return 'bg-yellow-500 text-black';
      case 'recurring': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    return timeString || 'Time not set';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto mb-6">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={loadEvents} className="flex items-center gap-2 mx-auto">
                <FiRefreshCw size={16} />
                Try Again
              </Button>
              </div>
              </div>
          </div>
        </div>
      );
    }

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Events Calendar</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              No events available at the moment. Please check back later.
            </p>
            <Button onClick={loadEvents} className="flex items-center gap-2 mx-auto">
              <FiRefreshCw size={16} />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Events Calendar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View all community events in an interactive calendar. Click on any date or event to see details.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <FiFilter size={20} className="text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {eventCategories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Events' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FullCalendar */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-b border-border">
                <CardTitle className="text-xl flex items-center gap-2">
                  <FiCalendar className="text-blue-600 dark:text-blue-400" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="fullcalendar-container">
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={calendarEvents}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    height="auto"
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,dayGridWeek'
                    }}
                    dayMaxEvents={3}
                    moreLinkClick="popover"
                    eventDisplay="block"
                    eventTimeFormat={{
                      hour: 'numeric',
                      minute: '2-digit',
                      meridiem: 'short'
                    }}
                    eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
                    dayCellClassNames="hover:bg-accent/50 transition-colors"
                    eventContent={(arg) => (
                      <div className="p-1 overflow-hidden">
                        <div className="text-xs font-medium truncate">
                          {arg.event.title}
                  </div>
                </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <FiCalendar className="text-blue-600" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredEvents.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex gap-3">
                        {/* Event Image */}
                        <div className="flex-shrink-0">
                          {event.image_url ? (
                            <img
                              src={event.image_url}
                              alt={event.title}
                              className="w-16 h-16 rounded-lg object-cover border border-border shadow-sm"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border border-border flex items-center justify-center shadow-sm">
                              <FiCalendar className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        
                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm line-clamp-2 text-foreground">{event.title}</h4>
                            <div className="flex gap-1 flex-shrink-0 ml-2">
                              <Badge className={getCategoryColor(event.type)} size="sm">
                                {event.type || 'General'}
                          </Badge>
                        </div>
                      </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <FiCalendar size={12} />
                          <span>{formatDate(event.date)}</span>
                        </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Categories */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <FiFilter className="text-green-600" />
                  Event Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {eventCategories.filter(cat => cat !== 'all').map(category => (
                    <div key={category} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(category).replace('text-white', '').replace('text-black', '')}`}></div>
                        <span className="text-sm font-medium">{category}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {filteredEvents.filter(event => event.type === category).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl">{selectedEvent.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                >
                  <FiX size={20} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedEvent.image_url && (
                  <img
                    src={selectedEvent.image_url}
                    alt={selectedEvent.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={getCategoryColor(selectedEvent.type)}>
                    {selectedEvent.type || 'General'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FiCalendar size={16} className="text-muted-foreground" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                  {selectedEvent.image_url && (
                    <div className="flex items-center gap-2">
                      <FiMapPin size={16} className="text-muted-foreground" />
                      <span>Location available</span>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedEvent.description}
                </p>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FiHeart size={16} />
                    Save Event
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FiShare2 size={16} />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => {
                      const event = selectedEvent;
                      
                      // Create .ics file content
                      const formatDateForICS = (date) => {
                        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                      };
                      
                      const startDate = new Date(event.date);
                      startDate.setHours(9, 0, 0, 0); // Default to 9 AM
                      
                      const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours later
                      
                      const icsContent = [
                        'BEGIN:VCALENDAR',
                        'VERSION:2.0',
                        'PRODID:-//hacksw/handcal//NONSGML v1.0//EN',
                        'BEGIN:VEVENT',
                        `DTSTART:${formatDateForICS(startDate)}`,
                        `DTEND:${formatDateForICS(endDate)}`,
                        `SUMMARY:${event.title}`,
                        `DESCRIPTION:${event.description}`,
                        'END:VEVENT',
                        'END:VCALENDAR'
                      ].join('\r\n');
                      
                      // Create and download .ics file
                      const blob = new Blob([icsContent], { type: 'text/calendar' });
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    }}
                  >
                    <FiCalendar size={16} />
                  Add to Calendar
                </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions Section */}
        <div className="mt-12">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FiUsers className="text-orange-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => {
                    // Get current month's events
                    const currentDate = new Date();
                    const currentMonth = currentDate.getMonth();
                    const currentYear = currentDate.getFullYear();
                    
                    const thisMonthEvents = filteredEvents.filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getMonth() === currentMonth && 
                             eventDate.getFullYear() === currentYear;
                    });
                    
                    if (thisMonthEvents.length === 0) {
                      alert('No events found for this month');
                      return;
                    }
                    
                    // Create .ics file content for all events
                    const formatDateForICS = (date) => {
                      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                    };
                    
                    const createEventICS = (event) => {
                      const startDate = new Date(event.date);
                      startDate.setHours(9, 0, 0, 0); // Default to 9 AM
                      
                      const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours later
                      
                      return [
                        'BEGIN:VEVENT',
                        `DTSTART:${formatDateForICS(startDate)}`,
                        `DTEND:${formatDateForICS(endDate)}`,
                        `SUMMARY:${event.title}`,
                        `DESCRIPTION:${event.description}`,
                        'END:VEVENT'
                      ].join('\r\n');
                    };
                    
                    const icsContent = [
                      'BEGIN:VCALENDAR',
                      'VERSION:2.0',
                      'PRODID:-//hacksw/handcal//NONSGML v1.0//EN',
                      ...thisMonthEvents.map(createEventICS),
                      'END:VCALENDAR'
                    ].join('\r\n');
                    
                    // Create and download .ics file
                    const blob = new Blob([icsContent], { type: 'text/calendar' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                      'July', 'August', 'September', 'October', 'November', 'December'];
                    link.download = `islamic_events_${monthNames[currentMonth]}_${currentYear}.ics`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  <FiCalendar size={24} className="text-orange-600" />
                  <div className="text-center">
                    <div className="font-semibold">Add All {new Date().toLocaleString('en-US', { month: 'long' })} Events</div>
                    <div className="text-sm text-muted-foreground">Download calendar file</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <FiUsers size={24} className="text-blue-600" />
                  <div className="text-center">
                    <div className="font-semibold">Subscribe to Updates</div>
                    <div className="text-sm text-muted-foreground">Get notified of new events</div>
                  </div>
                </Button>
              </div>
              </CardContent>
            </Card>
          </div>

        <style jsx>{`
          .fullcalendar-container {
            background: transparent;
          }
          
          .fullcalendar-container .fc {
            background: transparent;
          }
          
          .fullcalendar-container .fc-toolbar {
            background: transparent;
            border: none;
            padding: 1rem;
            margin-bottom: 0;
          }
          
          .fullcalendar-container .fc-toolbar-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: hsl(var(--foreground));
          }
          
          .fullcalendar-container .fc-button {
            background: hsl(var(--primary));
            border: 1px solid hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            transition: all 0.2s;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .fullcalendar-container .fc-button:hover {
            background: hsl(var(--primary) / 0.9);
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .fullcalendar-container .fc-button:focus {
            outline: 2px solid hsl(var(--primary));
            outline-offset: 2px;
          }
          
          .fullcalendar-container .fc-button:disabled {
            background: hsl(var(--muted));
            border-color: hsl(var(--muted));
            color: hsl(var(--muted-foreground));
          }
          
          .fullcalendar-container .fc-daygrid-day {
            background: hsl(var(--background));
            border: 1px solid hsl(var(--border));
            transition: all 0.2s;
          }
          
          .fullcalendar-container .fc-daygrid-day:hover {
            background: hsl(var(--accent) / 0.3);
            transform: scale(1.02);
          }
          
          .fullcalendar-container .fc-daygrid-day.fc-day-today {
            background: hsl(var(--primary) / 0.1);
            border-color: hsl(var(--primary));
            box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
          }
          
          .fullcalendar-container .fc-daygrid-day-number {
            color: hsl(var(--foreground));
            font-weight: 500;
            padding: 0.5rem;
          }
          
          .fullcalendar-container .fc-col-header-cell {
            background: hsl(var(--muted));
            border: 1px solid hsl(var(--border));
            padding: 0.75rem 0.5rem;
            font-weight: 600;
          }
          
          .fullcalendar-container .fc-col-header-cell-cushion {
            color: hsl(var(--muted-foreground));
            font-weight: 600;
            text-decoration: none;
          }
          
          .fullcalendar-container .fc-event {
            border-radius: 0.375rem;
            border: none;
            padding: 0.25rem 0.5rem;
            margin: 0.125rem 0;
            font-size: 0.75rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          
          .fullcalendar-container .fc-event:hover {
            opacity: 0.9;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          }
          
          .fullcalendar-container .fc-more-link {
            color: hsl(var(--muted-foreground));
            font-size: 0.75rem;
            font-weight: 500;
            text-decoration: underline;
          }
          
          .fullcalendar-container .fc-more-link:hover {
            color: hsl(var(--foreground));
          }
        `}</style>
      </div>
    </div>
  );
};

export default CalendarPage;
