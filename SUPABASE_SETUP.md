# Supabase Setup Guide

This guide will help you set up Supabase for the admin panel authentication.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `your-project-name`
   - Database Password: `your-secure-password`
   - Region: Choose closest to your users
5. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Create Environment File

1. Create a `.env` file in your project root
2. Add the following variables:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Example:**

```env
REACT_APP_SUPABASE_URL=https://abc123def456.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYzEyM2RlZjQ1NiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM5NzQ5NjAwLCJleHAiOjE5NTUzMjU2MDB9.example
```

## 4. Create Admin User

### Option A: Using Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Enter admin email and password
4. After creating, click on the user
5. In **User metadata**, add:
   ```json
   {
     "role": "admin",
     "name": "Administrator"
   }
   ```

### Option B: Using SQL (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL to create an admin user:

```sql
-- Create admin user (replace with your email)
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  'admin@yourdomain.com',
  crypt('your-secure-password', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"], "role": "admin"}',
  '{"name": "Administrator", "role": "admin"}',
  NOW(),
  NOW()
);
```

## 5. Test the Setup

1. Start your React app: `npm start`
2. Navigate to `/admin/login`
3. Login with your admin credentials
4. You should be redirected to the admin dashboard

## 6. Database Tables (Optional)

If you want to use the database features, create these tables in Supabase:

### Donations Table

```sql
CREATE TABLE donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  goal DECIMAL(10,2),
  raised DECIMAL(10,2) DEFAULT 0,
  organization TEXT,
  category TEXT,
  location TEXT,
  urgency TEXT,
  end_date DATE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Events Table

```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location TEXT,
  max_attendees INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Jumaa Table

```sql
CREATE TABLE jumaa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  khutba_title TEXT,
  khateeb TEXT,
  prayer_time TIME,
  announcements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 7. Row Level Security (RLS)

Enable RLS for security:

```sql
-- Enable RLS on tables
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE jumaa ENABLE ROW LEVEL SECURITY;

-- Create policies (example for donations)
CREATE POLICY "Admins can manage donations" ON donations
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**

   - Check your `.env` file exists and has correct values
   - Restart your development server after adding `.env`

2. **"Access denied. Admin privileges required"**

   - Make sure your user has `role: "admin"` in metadata
   - Check the user exists in Supabase Auth

3. **"Invalid login credentials"**

   - Verify email/password are correct
   - Check if user exists in Supabase Auth

4. **CORS errors**
   - Add your localhost URL to Supabase Auth settings
   - Go to **Authentication** → **URL Configuration**
   - Add `http://localhost:3000` to Site URL

## Security Notes

- Never commit your `.env` file to version control
- Use strong passwords for admin accounts
- Consider enabling 2FA for admin accounts
- Regularly rotate your API keys
- Use Row Level Security (RLS) policies
