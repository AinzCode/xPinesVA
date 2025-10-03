# Pines VA - Premium Virtual Assistant Services Website

A comprehensive website for Pines VA, built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. Features include service showcases, contact forms, and social media integration.

## 🚀 Features

- **Modern Design**: Clean, professional UI with responsive design
- **Service Pages**: Detailed information about GVA, EVA, ISA, and MVA services
- **Contact Forms**: Comprehensive contact and consultation request forms
- **Social Integration**: Links to LinkedIn, Facebook, and Twitter
- **SEO Optimized**: Meta tags and structured content for search engines
- **Fast Performance**: Built with Next.js 15 and optimized for speed

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (Database, Auth, Storage)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Radix UI

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pines-va.git
   cd pines-va
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Email Service (optional - for contact forms)
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=hrteam@pinesva.com
   ```

4. **Set up Supabase** (Optional for enhanced features)
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Set up your database tables for contact forms, inquiries, etc.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Pages Structure

- **Home** (`/`) - Landing page with all sections
- **Our Story** (`/our-story`) - About us, mission & vision
- **Expertise** (`/expertise`) - Detailed service information
- **Let's Connect** (`/connect`) - Contact form and information
- **Easy Guides** - Step-by-step process (coming soon)
- **Social Spaces** - Social media integration (coming soon)



## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Customization

### Adding New Services
1. Update the services array in relevant components
2. Add new service pages under `/app/expertise/[service]/`
3. Update navigation and links

### Styling Changes
All styling uses Tailwind CSS classes. Key color scheme:
- Primary: Blue (blue-600, blue-700)
- Secondary: Purple, Green, Red for different services
- Neutral: Gray shades for text and backgrounds

## 📈 Performance Optimizations

- Next.js 15 App Router for optimal routing
- Image optimization with Next.js Image component
- Lazy loading for better initial load times
- CSS optimization with Tailwind CSS purging

## 🚀 Deployment

### Deploy on Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy on Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Analytics & Monitoring (Optional)

Consider adding:
- Google Analytics for traffic monitoring
- Sentry for error tracking
- PostHog for user behavior analysis

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions about this website:
- Email: hrteam@pinesva.com
- Phone: +1 (234) 567-8900

## 🔗 Links

- [Live Website](https://pinesva.com)
- [Documentation](https://github.com/yourusername/pines-va/wiki)
- [Issues](https://github.com/yourusername/pines-va/issues)
