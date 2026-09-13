# 🗄️ Database Setup - Step-by-Step Guide

> **This is the LAST step before your website is fully live!**

---

## ⚡ TL;DR (Just the Steps)

1. Open https://app.supabase.com
2. Go to SQL Editor
3. Copy all content from `setup-database-final.sql`
4. Paste into Supabase
5. Click "Run"
6. Done! Website now has a database

---

## 📸 Detailed Instructions

### **Step 1: Open Supabase Dashboard**

Go to: **https://app.supabase.com**

You should see your project listed.

Click on **"pranam-software"** project (or your project name)

### **Step 2: Navigate to SQL Editor**

Once inside your project:
- Look at the left sidebar
- Find **"SQL Editor"** option
- Click it

### **Step 3: Create New Query**

You'll see some example queries.
- Click **"New Query"** button (top left)
- A blank SQL editor appears

### **Step 4: Open the SQL File**

Go back to your code editor/file explorer:
- Open the file: **`setup-database-final.sql`**
- It's in the root of `pranam-software` folder

**IMPORTANT**: Use `setup-database-final.sql`, NOT `setup-database-fixed.sql`

### **Step 5: Copy All Content**

In the SQL file:
- **Select All** (Ctrl+A)
- **Copy** (Ctrl+C)

### **Step 6: Paste into Supabase**

Back in the Supabase SQL Editor:
- **Paste** (Ctrl+V)
- All the SQL code should appear

### **Step 7: Run the Script**

Look for the **"Run"** button (usually top right)
- Click it
- Wait 2-3 seconds for execution

### **Step 8: Check for Success**

You should see output like this:

```
✅ Database setup completed successfully! All schema issues fixed.
```

If you see this message, **YOU'RE DONE!** 🎉

---

## ✅ Verification

After running the script, you should see these verification queries run automatically:

### **1. Check Tables Created**
```
Tables Created:
- blog_posts
- hero_slides
- page_views
- project_inquiries
- services
- team_members
- testimonials
```

### **2. Check Team Members Columns**
```
Team Members Columns:
✓ id (uuid)
✓ created_at (timestamp)
✓ name (text)
✓ ini (text) ← Initials (new!)
✓ role (text)
✓ skills (text)
✓ img (text) ← Image URL
✓ email (text)
✓ linkedin_url (text)
✓ github_url (text)
✓ active (boolean)
✓ sort_order (integer)
```

### **3. Check Testimonials Columns**
```
Testimonials Columns:
✓ id (uuid)
✓ created_at (timestamp)
✓ name (text)
✓ ini (text) ← Added!
✓ at (text) ← Added!
✓ tag (text) ← Added!
✓ time (text) ← Added!
✓ quote (text)
✓ img (text) ← Added!
✓ active (boolean)
✓ sort_order (integer)
```

### **4. Check Page Views Columns**
```
Page Views Columns:
✓ ... all columns present
✓ duration_seconds (integer) ← Added!
```

---

## 🎯 What Gets Created

### **Tables**

| # | Table | Purpose |
|---|-------|---------|
| 1 | `project_inquiries` | Stores contact form submissions |
| 2 | `hero_slides` | Homepage slider content |
| 3 | `page_views` | Website analytics & visitor tracking |
| 4 | `services` | Services catalog |
| 5 | `team_members` | Team member profiles |
| 6 | `testimonials` | Client testimonials/reviews |
| 7 | `blog_posts` | Blog articles |

### **Security Features**

- ✅ RLS (Row Level Security) on all tables
- ✅ Public users see only published/active content
- ✅ Admin users can manage everything
- ✅ Service role for internal operations

### **Sample Data**

- ✅ 3 hero slides included
- ✅ 5 services included
- ✅ 1 sample inquiry (for reference)
- ✅ Other tables empty and ready for your data

---

## 🚀 What Happens After Setup

### **Website Features Activate**

Your website will now:

- ✅ Display team members on the team page
- ✅ Show testimonials on homepage
- ✅ Track analytics & page views
- ✅ Store contact form submissions
- ✅ Allow admin to manage all content
- ✅ Support blog posts
- ✅ Work without any database errors

### **Admin Panel Becomes Fully Functional**

You can now:
- 📊 View analytics dashboard
- 👥 Add/edit team members
- ⭐ Add/edit testimonials
- 📝 Write blog posts
- 🎯 Manage services
- 📱 Manage products
- 📋 View customer inquiries
- 🏢 Update company info

---

## ❌ If Something Goes Wrong

### **Error: "ERROR 42P17"**
- This was about functions in indexes
- **Already fixed in `setup-database-final.sql`**
- Just use that file

### **Error: "Table already exists"**
- Script automatically drops old tables first
- Just run it again
- Or manually delete the old table in Supabase

### **Error: "Permission denied"**
- Make sure you're using the SQL Editor, not a client
- You need project admin access
- Check your Supabase credentials

### **No Error, But Nothing Seems to Happen**
- Scroll down in Supabase editor to see results
- Check that all output appears
- Look for the success message at the end

### **Website Still Shows Errors**
1. Reload the page (Ctrl+F5 or Cmd+Shift+R)
2. Restart your dev server: `npm run dev`
3. Clear browser cache
4. Check browser console (F12) for details

---

## 📝 After Setup: Testing

### **Test 1: Team Page**
1. Start your dev server: `npm run dev`
2. Go to: http://localhost:5176/team
3. Should show team members
4. No database errors

### **Test 2: Testimonials**
1. Go to: http://localhost:5176 (home page)
2. Scroll down to testimonials section
3. Should show client reviews
4. No errors about missing columns

### **Test 3: Contact Form**
1. Go to: http://localhost:5176/contact
2. Fill in a form and submit
3. Go to: http://localhost:5176/admin/enquiries
4. Should see your submission listed

### **Test 4: Admin Panel**
1. Go to: http://localhost:5176/admin/login
2. Login with your credentials
3. Navigate through each section
4. Should work without database errors

---

## 💾 Backup & Recovery

### **Backup Your Database** (Optional but recommended)

In Supabase Dashboard:
1. Go to **Settings**
2. **Database**
3. Click **"Backup"**
4. **"Create Backup"**

This creates a restore point.

### **If You Need to Reset**

1. Go back to SQL Editor
2. Run these commands:

```sql
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.page_views CASCADE;
DROP TABLE IF EXISTS public.hero_slides CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.project_inquiries CASCADE;
```

Then:
3. Run `setup-database-final.sql` again

---

## 🎓 Understanding the SQL Script

The script does this:

```sql
-- 1. Delete old tables (if they exist)
DROP TABLE IF EXISTS public.testimonials CASCADE;
-- ... more drops

-- 2. Create a utility function
CREATE OR REPLACE FUNCTION update_updated_at_column()
-- This keeps track of "when was this last updated"

-- 3. Create all 7 tables with correct columns
CREATE TABLE public.project_inquiries ( ... );
CREATE TABLE public.hero_slides ( ... );
-- ... etc

-- 4. Set up security policies (RLS)
CREATE POLICY "anyone can read services"
-- This controls who can see what

-- 5. Add sample data
INSERT INTO public.hero_slides ...
-- Gets you started with example content

-- 6. Run verification queries
SELECT column_name FROM information_schema.columns ...
-- Makes sure everything was created correctly
```

**Result**: A fully configured, secure, ready-to-use database!

---

## ✨ Tips & Tricks

### **Make a Backup Before Running**
```sql
-- Save this first (Supabase doesn't auto-backup before SQL runs)
-- Just select all tables and view them
```

### **Run Script in Off-Hours**
- Best time: When no one is using the website
- Time to run: 2-3 seconds
- Downtime: None (tables recreated instantly)

### **Keep Documentation**
- Save the column structure somewhere
- Reference it when adding features
- Update if you add new columns

### **Monitor Analytics**
- After setup, page_views table collects data
- Check Admin → Analytics to see visitor data
- Use this info to improve your site

---

## 🎉 You're Ready!

Once the script runs successfully:

```
✅ Database setup complete
✅ All tables created
✅ Security policies active
✅ Sample data loaded
✅ Website ready to go live
```

**That's it! Your website is now fully functional!** 🚀

---

## 📞 Quick Reference

| Item | Details |
|------|---------|
| **URL** | https://app.supabase.com |
| **File to Use** | `setup-database-final.sql` |
| **Time Required** | 2-3 minutes |
| **Risk Level** | Very Low (auto-drops old tables) |
| **Reversible** | Yes (restore from backup) |

---

**Need help?** Check the detailed `DATABASE_SETUP_COMPLETE_GUIDE.md` for more info!
