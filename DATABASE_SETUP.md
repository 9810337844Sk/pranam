# Database Setup Guide

This project uses Supabase for the database and content management. Follow these steps to set up your database.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (usually takes 2-3 minutes)
3. Once ready, go to **Settings** → **API** in your Supabase dashboard

## 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   - `VITE_SUPABASE_URL`: Your project URL (looks like `https://abcdefgh.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY`: Your anon/public key (starts with `eyJ` and is very long)
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (starts with `eyJ` and is very long)

## 3. Set Up Database Tables

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the contents of `setup-database.sql` into the editor
3. Click **Run** to create all required tables

## 4. Configure Row Level Security (Optional)

The setup script includes basic RLS policies. For production, you may want to:
- Review and customize the security policies
- Set up proper user authentication
- Configure more granular access controls

## 5. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your site - you should see a green database status banner if everything is working
3. If you see warnings about missing tables, re-run the `setup-database.sql` script

## Troubleshooting

### "Database issue" banner appears
- Check that your Supabase URL and keys are correct in `.env`
- Verify your Supabase project is active (not paused)
- Check browser console for specific error messages

### "Database setup needed" banner appears
- Run the `setup-database.sql` script in your Supabase SQL editor
- Check that all tables were created successfully

### Site shows blank screen
- Check browser console for JavaScript errors
- Verify all environment variables are set correctly
- Try disabling the DatabaseStatus component temporarily by commenting it out in `App.tsx`

## Using Without Database

The site will work without a database connection using fallback data. All content will be loaded from the static files in `src/data/`. The admin panel will not function without a database.

To run without database:
1. Leave Supabase credentials empty or invalid in `.env`
2. The site will automatically use fallback data
3. A warning banner will appear but can be dismissed