# Database Schema Fix - Complete Analysis

## 🔍 **Issues Found:**

### 1. **TESTIMONIALS Table Issues**
**Problem:** Missing columns that the code expects
- ❌ Missing: `at` (company/organization name)
- ❌ Missing: `ini` (initials for avatar)
- ❌ Missing: `tag` (tag/category)
- ❌ Missing: `time` (when testimonial was given)
- ❌ Missing: `quote` (testimonial text - was named differently)
- ❌ Missing: `img` (image URL)

**Expected Type** (from site.ts):
```typescript
export type Testimonial = {
  name: string      // ✓ Exists
  ini: string       // ✗ Missing
  at: string        // ✗ Missing
  tag: string       // ✗ Missing
  time: string      // ✗ Missing
  quote: string     // ✗ Missing
  img: string       // ✗ Missing
}
```

### 2. **TEAM_MEMBERS Table Issues**
**Problem:** Wrong column name
- ❌ Current: `image_url`
- ✓ Expected: `img`

**Site uses:** `img` column
```typescript
img: 'https://images.unsplash.com/...'
```

### 3. **PAGE_VIEWS Table Issues**
**Problem:** Missing analytics column
- ❌ Missing: `duration_seconds` (for tracking session duration)

---

## 📋 **Corrected Schema:**

### **TESTIMONIALS Table** (CORRECTED)
```sql
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,           -- Client name
  ini TEXT NOT NULL,            -- Initials (e.g., "XY")
  at TEXT NOT NULL,             -- Company/Organization
  tag TEXT,                     -- Tag/Category
  time TEXT,                    -- When given (e.g., "3 weeks ago")
  quote TEXT NOT NULL,          -- Testimonial text
  img TEXT,                     -- Image URL
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);
```

### **TEAM_MEMBERS Table** (CORRECTED)
```sql
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  img TEXT,                     -- Changed from image_url to img
  email TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);
```

### **PAGE_VIEWS Table** (CORRECTED)
```sql
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT,
  user_id UUID,
  country TEXT,
  city TEXT,
  device_type TEXT DEFAULT 'desktop',
  browser TEXT,
  os TEXT,
  duration_seconds INTEGER DEFAULT 0  -- Added for analytics
);
```

---

## 🚀 **How to Fix:**

### **Step 1: Drop Old Tables**
```sql
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.page_views CASCADE;
```

### **Step 2: Run the Fixed Script**
1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Copy entire content from `setup-database-fixed.sql`
4. Click **Run**
5. Wait for completion

### **Step 3: Verify**
The script includes verification queries that will show:
- ✓ All tables created
- ✓ team_members has `img` column (not `image_url`)
- ✓ testimonials has all required columns: `at`, `ini`, `tag`, `time`, `quote`, `img`
- ✓ page_views has `duration_seconds` column

---

## 📝 **Column Reference Table:**

| Table | Column | Type | Purpose |
|-------|--------|------|---------|
| **testimonials** | name | TEXT | Client name |
| | ini | TEXT | Initials (XV, AK, etc.) |
| | at | TEXT | Company name |
| | tag | TEXT | Category/tag |
| | time | TEXT | Relative time ("3 weeks ago") |
| | quote | TEXT | Testimonial text |
| | img | TEXT | Avatar image URL |
| **team_members** | img | TEXT | Team member photo (NOT image_url) |
| **page_views** | duration_seconds | INTEGER | Session duration tracking |

---

## ✅ **Files Provided:**

1. **setup-database-fixed.sql** - Complete corrected SQL script
   - Drops old tables with wrong schema
   - Creates all tables with correct columns
   - Includes proper RLS policies
   - Includes sample data
   - Includes verification queries

---

## 🎯 **Next Steps:**

1. **Open Supabase SQL Editor**
2. **Copy full content of setup-database-fixed.sql**
3. **Paste into SQL Editor**
4. **Click Run**
5. **Verify in Verification section**
6. **Website should work perfectly!**

---

## 💡 **What Changed:**

✅ **TESTIMONIALS**: Now has `at`, `ini`, `tag`, `time`, `quote`, `img`
✅ **TEAM_MEMBERS**: Changed `image_url` → `img`
✅ **PAGE_VIEWS**: Added `duration_seconds`
✅ **All RLS policies**: Properly configured
✅ **All indexes**: For performance

---

**After running this script, all schema cache errors will be resolved!** 🎉
