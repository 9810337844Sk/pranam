-- ============================================================================
-- REMOVE DUPLICATE PRODUCTS FROM DATABASE
-- Run this in Supabase SQL Editor to clean up duplicates
-- ============================================================================

-- ============================================================================
-- STEP 1: View all products to see duplicates (optional - just for checking)
-- ============================================================================
SELECT name, COUNT(*) as count FROM public.products GROUP BY name HAVING COUNT(*) > 1;

-- ============================================================================
-- STEP 2: Delete ALL products and start fresh
-- ============================================================================
DELETE FROM public.products;

-- ============================================================================
-- STEP 3: Verify table is empty
-- ============================================================================
SELECT COUNT(*) as total_products FROM public.products;

-- ============================================================================
-- STEP 4: Now insert fresh data only ONCE
-- Run INSERT_PRANAM_PRODUCTS.sql after this to add products
-- ============================================================================

-- ============================================================================
-- VERIFICATION AFTER INSERTING NEW DATA
-- ============================================================================
-- Run this after inserting products to verify no duplicates:
-- SELECT name, COUNT(*) as count FROM public.products GROUP BY name HAVING COUNT(*) > 1;
-- (Should return 0 rows if no duplicates)

-- To see all products:
-- SELECT id, name, category, active FROM public.products ORDER BY sort_order;
