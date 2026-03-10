# Quick Setup Guide

Follow these steps to get your portfolio website up and running:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Database

1. Create a PostgreSQL database (locally or use a service like Supabase, Railway, etc.)

2. Copy the environment file:
   ```bash
   cp env.example .env
   ```

3. Edit `.env` and add your database URL:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db?schema=public"
   ```

4. Generate Prisma Client and push schema:
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Step 3: Add Your Images

Add the following images to the `/public` folder:
- `logo.png` - Your brand logo (square, transparent PNG recommended)
- `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` - Hero carousel images
- `about-image.jpg` - Your professional photo
- `favicon.ico` - Website favicon

See `public/placeholder-images.md` for detailed requirements.

## Step 4: (Optional) Seed Sample Data

Run the seed script to add sample projects:
```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

Or use Prisma Studio to add data manually:
```bash
npm run db:studio
```

## Step 5: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 6: Customize Content

1. **Owner Information**: Update in:
   - `components/Footer.tsx`
   - `app/layout.tsx` (metadata)
   - `components/sections/Contact.tsx`

2. **Social Links**: Update in:
   - `components/Footer.tsx`
   - `components/sections/Contact.tsx`

3. **Skills**: Update in `components/sections/Skills.tsx` or add via database

4. **About Section**: Update in `components/sections/About.tsx`

## Step 7: (Optional) Set Up Contact Form Email

The contact form is ready but needs email service configuration. See `README.md` for options (Resend, SendGrid, etc.).

## Step 8: Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database credentials

### Image Not Loading
- Verify images exist in `/public` folder
- Check file names match exactly (case-sensitive)
- Use Next.js Image component for optimization

### Build Errors
- Run `npm run db:generate` after schema changes
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Next Steps

- Add your real projects via Prisma Studio
- Configure email service for contact form
- Deploy to Vercel, Netlify, or your preferred platform
- Set up custom domain
- Add analytics (Google Analytics, Plausible, etc.)

For detailed documentation, see `README.md`.
