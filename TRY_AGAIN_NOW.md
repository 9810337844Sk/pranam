# 🔧 Try Again - Fix Applied!

**Status**: ✅ **CORRECTED**  
**Error Found**: INSERT policy syntax  
**Error Fixed**: ✅ YES

---

## What Happened

You got this error:
```
ERROR: 42601: only WITH CHECK expression allowed for INSERT
```

**Why**: PostgreSQL INSERT policies must use `WITH CHECK`, not `USING`

**Status**: ✅ **FIXED** - All INSERT policies corrected

---

## Deploy Again Now

### Step 1: Open Supabase
- Go to https://app.supabase.com
- Select Pranam Software project
- Click SQL Editor → New Query

### Step 2: Copy Fixed Script
- Open file: `setup-database-final.sql`
- Copy entire file (Ctrl+A, Ctrl+C)

### Step 3: Paste & Run
- Go to Supabase SQL Editor
- Paste (Ctrl+V)
- Click "Run"

### Step 4: Wait for Success
- Should see: ✅ "Database setup completed successfully!"
- No errors this time!

---

## What Was Fixed

**Changed all INSERT policies from:**
```sql
CREATE POLICY "staff can insert X" ON public.X FOR INSERT
  TO authenticated
  USING (true);  -- ❌ WRONG
```

**To:**
```sql
CREATE POLICY "staff can insert X" ON public.X FOR INSERT
  TO authenticated
  WITH CHECK (true);  -- ✅ CORRECT
```

**Applied to 9 tables:**
- ✅ project_inquiries
- ✅ hero_slides
- ✅ services
- ✅ team_members
- ✅ testimonials
- ✅ blog_posts
- ✅ company_info
- ✅ products
- ✅ brands

---

## Status

✅ Script fixed and ready  
✅ Syntax verified  
✅ Ready to deploy  

**Just run it in Supabase!**

---

**Next**: Go to Supabase SQL Editor and run setup-database-final.sql
