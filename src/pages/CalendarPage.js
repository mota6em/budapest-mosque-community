import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiFilter, FiExternalLink, FiHeart, FiShare2, FiX } from 'react-icons/fi';
import { 
  eventsData, 
  eventCategories, 
  getCategoryColor, 
  getTypeColor, 
  formatDate, 
  formatTime,
  getFullCalendarEvents
} from '../data/events';

const CalendarPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Check for event ID in URL params
  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId) {
      const event = eventsData.find(e => e.id === parseInt(eventId));
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [searchParams]);

  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesCategory;
  });

  const calendarEvents = getFullCalendarEvents(filteredEvents);

  const handleEventClick = (clickInfo) => {
    const eventId = parseInt(clickInfo.event.id);
    const event = eventsData.find(e => e.id === eventId);
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
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
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
                        {arg.event.extendedProps.needsVolunteers && (
                          <div className="text-xs text-orange-200 truncate">
                            Volunteers Needed
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Details Sidebar */}
          <div className="space-y-6">
            {selectedEvent ? (
              <Card className="sticky top-6">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">Event Details</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEvent(null)}
                    >
                      <FiX size={16} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <img 
                      src={selectedEvent.image} 
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getCategoryColor(selectedEvent.category)}>
                        {selectedEvent.category}
                      </Badge>
                      <Badge className={getTypeColor(selectedEvent.type)}>
                        {selectedEvent.type}
                      </Badge>
                    </div>
                    {selectedEvent.needsVolunteers && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-orange-500 text-white animate-pulse">
                          Volunteers Needed
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Event Info */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedEvent.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm">
                        <FiCalendar size={16} className="text-muted-foreground" />
                        <span>{formatDate(selectedEvent.date)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <FiClock size={16} className="text-muted-foreground" />
                        <span>{formatTime(selectedEvent.time)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <FiMapPin size={16} className="text-muted-foreground" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      
                    </div>

                    {/* Volunteer Section */}
                    {selectedEvent.needsVolunteers && (
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                          Volunteers Needed
                        </h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                          {selectedEvent.volunteerDetails}
                        </p>
                        <Button 
                          asChild
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          <a 
                            href={selectedEvent.volunteerFormLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <FiExternalLink size={14} />
                            Register as Volunteer
                          </a>
                        </Button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          const url = window.location.href;
                          navigator.clipboard.writeText(url);
                          // You could add a toast notification here
                        }}
                        title="Share event link"
                      >
                        <FiShare2 size={16} />
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          const event = selectedEvent;
                          
                          // Parse time properly (convert 12-hour format to 24-hour)
                          const timeStr = event.time;
                          let hours = parseInt(timeStr.split(':')[0]);
                          const minutes = parseInt(timeStr.split(':')[1].split(' ')[0]);
                          const period = timeStr.includes('PM') ? 'PM' : 'AM';
                          
                          if (period === 'PM' && hours !== 12) {
                            hours += 12;
                          } else if (period === 'AM' && hours === 12) {
                            hours = 0;
                          }
                          
                          const startDate = new Date(event.date);
                          startDate.setHours(hours, minutes, 0, 0);
                          
                          const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours later
                          
                          // Create .ics file content
                          const formatDateForICS = (date) => {
                            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                          };
                          
                          const icsContent = [
                            'BEGIN:VCALENDAR',
                            'VERSION:2.0',
                            'PRODID:-//hacksw/handcal//NONSGML v1.0//EN',
                            'BEGIN:VEVENT',
                            `DTSTART:${formatDateForICS(startDate)}`,
                            `DTEND:${formatDateForICS(endDate)}`,
                            `SUMMARY:${event.title}`,
                            `DESCRIPTION:${event.description}`,
                            `LOCATION:${event.location}`,
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
                        Save to Calendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredEvents
                        .filter(event => new Date(event.date) >= new Date())
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .slice(0, 5)
                        .map(event => (
                        <div 
                          key={event.id} 
                          className="border-l-4 border-primary pl-4 cursor-pointer hover:bg-accent/50 p-2 rounded transition-all duration-200"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{event.title}</h4>
                            <div className="flex gap-1">
                              <Badge className={getCategoryColor(event.category)}>
                                {event.category}
                              </Badge>
                              {event.needsVolunteers && (
                                <Badge className="bg-orange-500 text-white text-xs">
                                  Volunteers
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <FiCalendar size={12} />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiClock size={12} />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Event Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Event Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {eventCategories.filter(cat => cat !== 'all').map(category => (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getCategoryColor(category).replace('text-white', '').replace('text-black', '')}`}></div>
                            <span className="text-sm">{category}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {filteredEvents.filter(event => event.category === category).length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                                         <Button 
                       variant="outline" 
                       className="w-full"
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
                           // Parse time properly (convert 12-hour format to 24-hour)
                           const timeStr = event.time;
                           let hours = parseInt(timeStr.split(':')[0]);
                           const minutes = parseInt(timeStr.split(':')[1].split(' ')[0]);
                           const period = timeStr.includes('PM') ? 'PM' : 'AM';
                           
                           if (period === 'PM' && hours !== 12) {
                             hours += 12;
                           } else if (period === 'AM' && hours === 12) {
                             hours = 0;
                           }
                           
                           const startDate = new Date(event.date);
                           startDate.setHours(hours, minutes, 0, 0);
                           
                           const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours later
                           
                           return [
                             'BEGIN:VEVENT',
                             `DTSTART:${formatDateForICS(startDate)}`,
                             `DTEND:${formatDateForICS(endDate)}`,
                             `SUMMARY:${event.title}`,
                             `DESCRIPTION:${event.description}`,
                             `LOCATION:${event.location}`,
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
                       <FiCalendar size={16} className="mr-2" />
                       Add all {new Date().toLocaleString('en-US', { month: 'long' })} events to your calendar
                     </Button>
                    <Button variant="outline" className="w-full">
                      <FiUsers size={16} className="mr-2" />
                      Subscribe to Updates
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
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
          padding: 0;
          margin-bottom: 1rem;
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
        }
        
        .fullcalendar-container .fc-button:hover {
          background: hsl(var(--primary) / 0.9);
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
        }
        
        .fullcalendar-container .fc-daygrid-day:hover {
          background: hsl(var(--accent));
        }
        
        .fullcalendar-container .fc-daygrid-day.fc-day-today {
          background: hsl(var(--primary) / 0.1);
          border-color: hsl(var(--primary));
        }
        
        .fullcalendar-container .fc-daygrid-day-number {
          color: hsl(var(--foreground));
          font-weight: 500;
        }
        
        .fullcalendar-container .fc-col-header-cell {
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          padding: 0.5rem;
        }
        
        .fullcalendar-container .fc-col-header-cell-cushion {
          color: hsl(var(--muted-foreground));
          font-weight: 600;
          text-decoration: none;
        }
        
        .fullcalendar-container .fc-event {
          border-radius: 0.25rem;
          border: none;
          padding: 0.125rem 0.25rem;
          margin: 0.125rem 0;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        
        .fullcalendar-container .fc-event:hover {
          opacity: 0.8;
        }
        
        .fullcalendar-container .fc-more-link {
          color: hsl(var(--muted-foreground));
          font-size: 0.75rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
