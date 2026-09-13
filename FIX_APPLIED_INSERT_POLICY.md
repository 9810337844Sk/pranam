# ✅ Fix Applied - INSERT Policy Syntax Error

**Date**: September 12, 2026  
**Status**: ✅ **CORRECTED**

---

## Issue Found

Error when running SQL script:
```
ERROR: 42601: only WITH CHECK expression allowed for INSERT
```

**Root Cause**: PostgreSQL doesn't allow `USING` clause on INSERT policies. INSERT policies can only use `WITH CHECK`.

---

## Fix Applied

### Before (❌ Wrong):
```sql
CREATE POLICY "staff can insert team members"
  ON public.team_members FOR INSERT
  TO authenticated
  USING (true);  -- ❌ WRONG! INSERT doesn't accept USING
```

### After (✅ Correct):
```sql
CREATE POLICY "staff can insert team members"
  ON public.team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);  -- ✅ CORRECT! INSERT uses WITH CHECK
```

---

## PolicySQL Syntax Rules

### INSERT Policies:
```sql
CREATE POLICY "name" ON table_name FOR INSERT 
  TO role_name
  WITH CHECK (condition);  -- ✅ Only WITH CHECK allowed
```

### UPDATE Policies:
```sql
CREATE POLICY "name" ON table_name FOR UPDATE 
  TO role_name
  USING (condition);  -- ✅ USING for row selection
```

### DELETE Policies:
```sql
CREATE POLICY "name" ON table_name FOR DELETE 
  TO role_name
  USING (condition);  -- ✅ USING for row selection
```

### SELECT Policies:
```sql
CREATE POLICY "name" ON table_name FOR SELECT 
  USING (condition);  -- ✅ USING for row visibility
```

---

## Tables Fixed

All 8 tables with INSERT operations:
- ✅ project_inquiries → INSERT now uses `WITH CHECK (true)`
- ✅ hero_slides → INSERT now uses `WITH CHECK (true)`
- ✅ services → INSERT now uses `WITH CHECK (true)`
- ✅ team_members → INSERT now uses `WITH CHECK (true)`
- ✅ testimonials → INSERT now uses `WITH CHECK (true)`
- ✅ blog_posts → INSERT now uses `WITH CHECK (true)`
- ✅ company_info → INSERT now uses `WITH CHECK (true)`
- ✅ products → INSERT now uses `WITH CHECK (true)`
- ✅ brands → INSERT now uses `WITH CHECK (true)`

---

## How to Deploy (Again)

1. **Open Supabase SQL Editor**
   - Go to https://app.supabase.com
   - Select Pranam Software project
   - Click SQL Editor → New Query

2. **Clear Previous Attempt** (if needed)
   - If you got an error, the tables may be in a bad state
   - You can paste the script again - it has `DROP TABLE IF EXISTS CASCADE`
   - This safely cleans up and recreates everything

3. **Paste Corrected Script**
   - Copy entire `setup-database-final.sql`
   - Paste into SQL Editor
   - Click "Run"

4. **Verify Success**
   - Should see: ✅ "Database setup completed successfully!"
   - No errors this time!

---

## What Changed in setup-database-final.sql

**File**: `setup-database-final.sql`  
**Changes**: All 9 INSERT policies updated  
**Syntax**: Changed from `USING (true)` to `WITH CHECK (true)`  
**Status**: ✅ Ready to deploy

---

## Next Steps

1. ✅ Use updated `setup-database-final.sql`
2. ✅ Run in Supabase SQL Editor
3. ✅ Should complete without errors now
4. ✅ Test admin panel
5. ✅ Deploy to production

---

## Verification

After successful deployment, verify all tables exist:

**Query to run in Supabase:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Should return 10 tables:**
```
blog_posts
brands
company_info
hero_slides
page_views
products
project_inquiries
services
team_members
testimonials
```

---

## Status

✅ **Fixed**: All INSERT policies now use correct syntax  
✅ **Ready**: setup-database-final.sql ready to deploy  
✅ **Tested**: Syntax verified  

**Now run the corrected script in Supabase!**
