# Pranam Software - Complete Setup Guide

This guide will help you set up the entire Pranam Software website with database and Cloudinary integration.

## 🗄️ Database Setup (Supabase)

### Step 1: Run the SQL Script

1. Open your **Supabase Dashboard** → Go to your project
2. Navigate to **SQL Editor**
3. Copy and paste the entire content from `setup-database.sql`
4. Click **RUN** to execute the script

The script will create:
- ✅ `project_inquiries` table (main contact form data)
- ✅ `services` table (service listings)
- ✅ `team_members` table (team information)
- ✅ `testimonials` table (client reviews)
- ✅ `blog_posts` table (blog content)
- ✅ All necessary indexes and triggers
- ✅ Row Level Security (RLS) policies
- ✅ Sample data for testing

### Step 2: Verify Setup

After running the script, check the output. You should see:
```
Database setup completed successfully!
```

### Step 3: Environment Variables

Make sure your `.env` file has these Supabase variables:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these from: **Supabase Dashboard → Settings → API**

## 🖼️ Cloudinary Setup

### Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. Note your **Cloud Name** from the dashboard

### Step 2: Create Upload Preset

1. In Cloudinary Dashboard → **Settings → Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure:
   - **Preset name**: `pranam_unsigned`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `pranam-software` (optional)
   - **Resource Type**: `Auto`
   - **Access Control**: `Public Read`
   - **Quality**: `Auto:Good`
   - **Format**: `Auto`
   - **Allowed formats**: `jpg,png,gif,webp`
   - **Max file size**: `10485760` (10MB)
5. Click **Save**

### Step 3: Environment Variables

Add these to your `.env` file:

```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=pranam_unsigned
```

### Step 4: Test Upload

The system will automatically validate the configuration when you try to upload images in the admin panel.

## 🔧 Admin Panel Setup

### Environment Variables

```env
VITE_ADMIN_PASSWORD=your-secure-password
```

### Access Admin Panel

1. Start your development server: `npm run dev`
2. Go to: `http://localhost:5176/admin/login`
3. Enter your admin password
4. You can now manage:
   - ✅ Contact inquiries
   - ✅ Services
   - ✅ Team members  
   - ✅ Testimonials
   - ✅ Blog posts
   - ✅ Hero slider
   - ✅ Company information

## 📱 Meta Pixel Setup (Optional)

If you want Facebook/Meta tracking:

```env
VITE_META_PIXEL_ID=your-pixel-id
```

Get this from: **Facebook Business → Events Manager**

## 🚀 Complete .env File Template

Create a `.env` file with all these variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=pranam_unsigned

# Admin Panel
VITE_ADMIN_PASSWORD=your-secure-password

# Meta Pixel (Optional)
VITE_META_PIXEL_ID=
```

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Contact form submissions save to database
- [ ] Admin panel login works
- [ ] Can view inquiries in admin panel
- [ ] Image uploads work in admin panel
- [ ] Website loads without errors
- [ ] Mobile responsive design works
- [ ] Services section slides on mobile
- [ ] WhatsApp floating button works
- [ ] Marquee banner is yellow
- [ ] All pages load correctly

## 🔍 Troubleshooting

### Database Issues
- **Error**: "Could not find table 'public.project_inquiries'"
  - **Solution**: Run the `setup-database.sql` script in Supabase SQL Editor

### Cloudinary Issues
- **Error**: "Cloudinary is not configured"
  - **Solution**: Check your `.env` file has correct cloud name and upload preset

### Admin Panel Issues
- **Error**: Can't login to admin
  - **Solution**: Check `VITE_ADMIN_PASSWORD` in `.env` file

### Contact Form Issues
- **Error**: Form submissions fail
  - **Solution**: Verify Supabase service role key and RLS policies

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure the SQL script ran successfully
4. Test with sample data first

---

## 🎉 Success!

Once everything is set up, your website will have:
- ✅ Professional contact form with database storage
- ✅ Full admin panel for content management
- ✅ Image upload and optimization
- ✅ Mobile-first responsive design
- ✅ Automatic service card sliding on mobile
- ✅ Modern UI with yellow theme accents
- ✅ SEO-optimized and fast loading

Your Pranam Software website is now ready for production! 🚀