import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventCard } from '@/components/events';
import { BlogCard, type BlogPost } from '@/components/blog';
import { AdBanner } from '@/components/ads';
import type { CarEvent } from '@/stores';
import heroImage from '@/assets/hero-events.jpg';

// Mock data for demonstration
const mockEvents: CarEvent[] = [
  {
    id: '1',
    title: 'Rassemblement Supercars Paris',
    description: 'Le plus grand rassemblement de supercars en Île-de-France. Venez admirer Ferrari, Lamborghini, Porsche et bien plus encore.',
    date: '2024-03-15',
    location: 'Paris, France',
    address: 'Esplanade du Trocadéro',
    image_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format',
    category: 'meeting',
    organizer_id: '1',
    organizer_name: 'Cars & Coffee Paris',
    current_participants: 245,
    max_participants: 500,
    is_featured: true,
    created_at: '2024-01-01',
  },
  {
    id: '2',
    title: 'Circuit Track Day - Le Mans',
    description: 'Journée circuit exclusive sur le mythique circuit des 24h du Mans. Pilotez votre voiture sur la piste.',
    date: '2024-03-22',
    location: 'Le Mans, France',
    address: 'Circuit des 24 Heures',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format',
    category: 'race',
    organizer_id: '2',
    organizer_name: 'ACO Events',
    current_participants: 89,
    max_participants: 100,
    is_featured: true,
    created_at: '2024-01-05',
  },
  {
    id: '3',
    title: 'Salon Auto Monaco',
    description: 'Le salon automobile de prestige de la Côte d\'Azur. Découvrez les dernières nouveautés du monde automobile.',
    date: '2024-04-05',
    location: 'Monaco',
    address: 'Grimaldi Forum',
    image_url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format',
    category: 'salon',
    organizer_id: '3',
    organizer_name: 'Monaco Auto Events',
    current_participants: 1250,
    is_featured: false,
    created_at: '2024-01-10',
  },
];

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'La nouvelle Ferrari 296 GTB dévoilée au Salon de Genève',
    excerpt: 'Ferrari présente sa dernière création hybride rechargeable, combinant un V6 turbo avec un moteur électrique pour une puissance totale de 830 chevaux.',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format',
    category: 'news',
    author_name: 'Jean Dupont',
    created_at: '2024-02-28',
    slug: 'ferrari-296-gtb-geneve',
  },
  {
    id: '2',
    title: 'Essai: Porsche 911 GT3 RS - La perfection sur circuit',
    excerpt: 'Nous avons pu tester la nouvelle 911 GT3 RS sur le circuit de Spa-Francorchamps. Voici notre verdict complet.',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f373e?w=800&auto=format',
    category: 'reviews',
    author_name: 'Marie Martin',
    created_at: '2024-02-25',
    slug: 'essai-porsche-911-gt3-rs',
  },
];

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden hero-gradient" aria-label="Section Hero">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Automotive events"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-1">
              🚗 La communauté automobile #1 en France
            </Badge>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/events">
                <Button size="lg" className="btn-accent text-base">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/events/create">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base">
                  {t('hero.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
            aria-label="Statistiques"
          >
            {[
              { icon: Calendar, value: '250+', label: 'Événements' },
              { icon: Users, value: '15K+', label: 'Membres' },
              { icon: MapPin, value: '50+', label: 'Villes' },
              { icon: TrendingUp, value: '98%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-4 text-center md:p-6">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-accent" />
                <div className="font-display text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== AD BANNER ===== */}
      <section aria-label="Bannière publicitaire">
        <AdBanner position="header" className="py-6" />
      </section>

      {/* ===== FEATURED EVENTS ===== */}
      <section className="py-16 md:py-24" aria-label="Événements en vedette">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="outline" className="mb-3">
                {t('events.featured')}
              </Badge>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {t('events.title')}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t('events.subtitle')}
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline" className="gap-2">
                {t('common.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section className="bg-secondary/30 py-16 md:py-24" aria-label="Blog">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge variant="outline" className="mb-3">
                {t('blog.latestNews')}
              </Badge>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {t('blog.title')}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {t('blog.subtitle')}
              </p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="gap-2">
                {t('common.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {mockPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24" aria-label="Call to Action">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center md:p-16"
          >
            <div className="relative z-10">
              <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
                Rejoignez la communauté AutoMeet
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                Créez votre profil, ajoutez vos véhicules et participez aux meilleurs événements automobiles de votre région.
              </p>
              <Link to="/auth?mode=register">
                <Button size="lg" className="btn-accent text-base">
                  Créer mon compte gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
