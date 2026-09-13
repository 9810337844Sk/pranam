# 🚀 Complete Database Setup Guide - Pranam Software

> **STATUS**: All code & website is ready. Just need database setup!

---

## 📋 What's Been Fixed

✅ **Schema Issues Fixed**
- Renamed `image_url` → `img` in team_members table
- Added missing columns in testimonials table: `ini`, `at`, `tag`, `time`, `img`
- Added `duration_seconds` column to page_views
- Removed problematic `date_trunc` function from indexes

✅ **Correct SQL Script Ready**
- File: `setup-database-final.sql` ← **USE THIS FILE**
- All tables with correct column names
- RLS (Row Level Security) policies configured
- Sample data included
- Verification queries included

✅ **Website Ready**
- All components working
- Error boundaries in place
- Admin panel configured
- Analytics tracking ready
- Content loading defensive

---

## 🎯 Quick Setup (3 Steps)

### **Step 1: Open Supabase**
Go to: https://app.supabase.com

Login with your credentials

Select your **pranam-software** project

### **Step 2: Open SQL Editor**
1. Click on **SQL Editor** (left sidebar)
2. Click **New Query**
3. New SQL editor tab opens

### **Step 3: Copy & Run SQL Script**

**IMPORTANT:** Use `setup-database-final.sql` file (NOT setup-database-fixed.sql)

1. Open file: `setup-database-final.sql` in your editor
2. **Select ALL content** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. **Paste** into Supabase SQL editor
5. Click **Run** button (top right)

### **Step 4: Wait for Success**

You should see output like:
```
✅ Database setup completed successfully! All schema issues fixed.
```

---

## 📊 What Tables Get Created

| Table | Purpose | Key Columns |
|-------|---------|-----------|
| **project_inquiries** | Customer inquiries | full_name, email, phone, service, status |
| **hero_slides** | Homepage slides | title, subtitle, image_url, sort_order |
| **page_views** | Analytics data | page_url, created_at, session_id, **duration_seconds** |
| **services** | Service offerings | name, slug, description, icon, active |
| **team_members** | Team profiles | name, position, **img**, linkedin_url |
| **testimonials** | Client reviews | name, **ini**, **at**, **tag**, **time**, quote, **img** |
| **blog_posts** | Blog articles | title, slug, content, published, published_at |

**Bold columns** = Previously missing/wrong columns (now fixed)

---

## ✅ Verification After Setup

After running the script, the database will auto-verify with these checks:

```sql
-- Check 1: All tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check 2: team_members has 'img' column
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'team_members' AND column_name = 'img';

-- Check 3: testimonials has all required columns
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'testimonials';
```

**Expected Result for Check 2 & 3:**
```
✓ img
✓ name
✓ ini
✓ at
✓ tag
✓ time
✓ quote
```

---

## 🎨 What Happens After Setup

### **Website Features Activate**

✅ **Team Page** - Shows team members with images
✅ **Testimonials** - Shows client reviews
✅ **Analytics** - Tracks page views
✅ **Admin Panel** - Can manage all content
✅ **Contact Form** - Stores inquiries in database

### **Admin Features Available**

- 📊 Analytics Dashboard
- 📝 Manage Hero Slides
- 🎯 Manage Services
- 👥 Manage Team Members
- ⭐ Manage Testimonials
- 📱 Manage Products
- 📚 Manage Blog Posts
- 🏢 Manage Company Info
- 📋 View Inquiries

---

## 🔐 Security Configuration

RLS (Row Level Security) is automatically configured:

| Table | Public Access | Authenticated Access | Service Role |
|-------|---------------|----------------------|--------------|
| project_inquiries | ❌ No | ✅ Read/Update | ✅ Insert |
| page_views | ❌ No | ✅ Read | ✅ Insert |
| team_members | ✅ Read (active) | ✅ Full | - |
| testimonials | ✅ Read (active) | ✅ Full | - |
| services | ✅ Read (active) | ✅ Full | - |
| blog_posts | ✅ Read (published) | ✅ Full | - |

**Result**: Public users see only published/active content. Admin can manage everything.

---

## 📝 Manual Alternative (If SQL Editor Fails)

If you can't use the SQL Editor, you can use Supabase CLI:

```bash
# Navigate to project
cd "d:\pranam-software\pranam-software\pranam-software"

# Login to Supabase
npx supabase login

# Run the SQL script
npx supabase db push < setup-database-final.sql
```

---

## 🆘 Troubleshooting

### **Error: "ERROR 42P17"**
- This was about non-IMMUTABLE functions in indexes
- **FIXED in `setup-database-final.sql`** ✅
- Just use the correct file

### **Error: "Column not found"**
- Old incorrect database still there
- Script automatically drops and recreates all tables
- Should work on second run

### **Error: "Permission denied"**
- Check your Supabase credentials in `.env`
- Make sure you're using the correct project
- Check RLS policies aren't too restrictive

### **Website Still Shows Errors**
1. Restart your dev server: `npm run dev`
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check browser console for specific errors
4. Run the SQL verification queries above

---

## 📱 Testing After Setup

### **Test Team Page**
1. Go to http://localhost:5176/team
2. Should show team members with images
3. No "Could not find 'img' column" error

### **Test Testimonials**
1. Go to http://localhost:5176 (home page)
2. Scroll to testimonials section
3. Should show client reviews without errors
4. No "Could not find 'at' column" error

### **Test Admin Panel**
1. Go to http://localhost:5176/admin/login
2. Login with your admin credentials
3. Should access all sections without database errors

### **Test Analytics**
1. Admin → Analytics
2. Should show page view statistics
3. No errors about missing columns

---

## 🎉 Done!

After completing these steps:

```
✅ Website loads perfectly
✅ All components work
✅ Team section displays
✅ Testimonials display
✅ Admin panel works
✅ Analytics tracking
✅ Form submissions saved
✅ No database errors
```

---

## 📞 Quick Reference

| Item | Value |
|------|-------|
| **Website URL** | http://localhost:5176 |
| **Admin Panel** | http://localhost:5176/admin |
| **Supabase Dashboard** | https://app.supabase.com |
| **SQL File to Use** | `setup-database-final.sql` |
| **Database User** | Check your `.env` file |

---

**That's it! You're ready to go!** 🚀
