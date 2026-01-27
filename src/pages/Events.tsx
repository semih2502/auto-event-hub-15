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
import { mockEvents } from '@/data/CarEvent';

const categories: (EventCategory | 'all')[] = ['all', 'meeting', 'race', 'salon', 'rally', 'auction'];


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

      {/* ===== HEADER ===== */}
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

      {/* ===== CONTENT ===== */}
      <section className="container py-8">

        {/* Filters */}
        <section aria-label="Filtres" className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
        </section>

        {/* Ad */}
        <section aria-label="Publicité" className="mb-8">
          <AdBanner position="inline" />
        </section>

        {/* Events Grid */}
        <section aria-label="Liste des événements">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* No Events */}
        {filteredEvents.length === 0 && (
          <section aria-label="Aucun événement" className="py-16 text-center">
            <p className="text-lg text-muted-foreground">{t('events.noEvents')}</p>
          </section>
        )}

      </section>
    </div>
  );
}
