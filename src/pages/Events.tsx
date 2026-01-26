import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventCard } from '@/components/events';
import { AdBanner } from '@/components/ads';
import type { CarEvent, EventCategory } from '@/stores';

const categories: (EventCategory | 'all')[] = ['all', 'meeting', 'race', 'salon', 'rally', 'auction'];

// Mock data
const mockEvents: CarEvent[] = [
  {
    id: '1',
    title: 'Rassemblement Supercars Paris',
    description: 'Le plus grand rassemblement de supercars en Île-de-France.',
    date: '2024-03-15',
    location: 'Paris, France',
    address: 'Esplanade du Trocadéro',
    image_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format',
    category: 'meeting',
    organizer_id: '1',
    organizer_name: 'Cars & Coffee Paris',
    current_participants: 245,
    is_featured: true,
    created_at: '2024-01-01',
  },
  {
    id: '2',
    title: 'Circuit Track Day - Le Mans',
    description: 'Journée circuit exclusive sur le mythique circuit des 24h du Mans.',
    date: '2024-03-22',
    location: 'Le Mans, France',
    address: 'Circuit des 24 Heures',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format',
    category: 'race',
    organizer_id: '2',
    organizer_name: 'ACO Events',
    current_participants: 89,
    is_featured: true,
    created_at: '2024-01-05',
  },
  {
    id: '3',
    title: 'Salon Auto Monaco',
    description: 'Le salon automobile de prestige de la Côte d\'Azur.',
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
  {
    id: '4',
    title: 'Rallye des Alpes',
    description: 'Rallye historique à travers les routes des Alpes françaises.',
    date: '2024-04-12',
    location: 'Annecy, France',
    address: 'Départ Place de l\'Hôtel de Ville',
    image_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format',
    category: 'rally',
    organizer_id: '4',
    organizer_name: 'Alpine Rally Club',
    current_participants: 65,
    is_featured: false,
    created_at: '2024-01-15',
  },
  {
    id: '5',
    title: 'Vente aux Enchères - Classics',
    description: 'Vente aux enchères de voitures de collection et classiques.',
    date: '2024-04-20',
    location: 'Lyon, France',
    address: 'Hôtel des Ventes de Lyon',
    image_url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&auto=format',
    category: 'auction',
    organizer_id: '5',
    organizer_name: 'Classic Cars Auctions',
    current_participants: 180,
    is_featured: false,
    created_at: '2024-01-20',
  },
  {
    id: '6',
    title: 'Cars & Coffee Bordeaux',
    description: 'Rassemblement mensuel de passionnés d\'automobiles à Bordeaux.',
    date: '2024-03-30',
    location: 'Bordeaux, France',
    address: 'Quais de Bordeaux',
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format',
    category: 'meeting',
    organizer_id: '6',
    organizer_name: 'Cars & Coffee Bordeaux',
    current_participants: 120,
    is_featured: false,
    created_at: '2024-01-25',
  },
];

export default function EventsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary py-16 text-white md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              {t('events.allEvents')}
            </Badge>
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              {t('events.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              {t('events.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('common.search') + '...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {t(`events.categories.${cat}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Ad */}
        <AdBanner position="inline" className="mb-8" />

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">{t('events.noEvents')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
