-- Create joumaa table
CREATE TABLE joumaa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT,
  language TEXT DEFAULT 'English',
  description TEXT,
  imam TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event table
CREATE TABLE event (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image_url TEXT,
  type TEXT DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donation table
CREATE TABLE donation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  name TEXT NOT NULL,
  contact TEXT,
  description TEXT,
  type TEXT DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE joumaa ENABLE ROW LEVEL SECURITY;
ALTER TABLE event ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can manage joumaa" ON joumaa
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage events" ON event
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage donations" ON donation
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Insert some sample data
INSERT INTO joumaa (title, link, language, description, imam, date) VALUES
('Friday Prayer - Week 1', 'https://example.com/joumaa1', 'English', 'Weekly Friday prayer service', 'Imam Ahmed', '2024-01-26'),
('Friday Prayer - Week 2', 'https://example.com/joumaa2', 'English', 'Weekly Friday prayer service', 'Imam Hassan', '2024-02-02');

INSERT INTO event (title, description, date, image_url, type) VALUES
('Community Iftar', 'Join us for community iftar during Ramadan', '2024-03-15', 'https://example.com/iftar.jpg', 'Community'),
('Islamic Workshop', 'Learn about Islamic principles and practices', '2024-03-20', 'https://example.com/workshop.jpg', 'Educational');

INSERT INTO donation (amount, name, contact, description, type) VALUES
(100.00, 'Ahmed Hassan', 'ahmed@example.com', 'Monthly donation for mosque maintenance', 'Monthly'),
(250.00, 'Fatima Ali', 'fatima@example.com', 'One-time donation for new prayer mats', 'One-time');
