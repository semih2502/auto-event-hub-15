import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { CarEvent } from '@/stores';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useLanguageStore } from '@/stores';

interface EventCardProps {
  event: CarEvent;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  meeting: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  race: 'bg-red-500/10 text-red-600 border-red-500/20',
  salon: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  rally: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  auction: 'bg-green-500/10 text-green-600 border-green-500/20',
};

export function EventCard({ event, featured = false }: EventCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const locale = language === 'fr' ? fr : enUS;

  const formattedDate = format(new Date(event.date), 'dd MMM yyyy', { locale });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className={`event-card overflow-hidden ${featured ? 'border-accent/50' : ''}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.image_url || '/placeholder.svg'}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {event.is_featured && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
              {t('events.featured')}
            </Badge>
          )}
          <Badge
            variant="outline"
            className={`absolute right-3 top-3 ${categoryColors[event.category] || ''}`}
          >
            {t(`events.categories.${event.category}`)}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 font-display text-lg font-semibold line-clamp-1">
            {event.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{event.current_participants} {t('events.participants')}</span>
            </div>
          </div>
          <Link to={`/events/${event.id}`}>
            <Button variant="outline" className="w-full">
              {t('common.learnMore')}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
