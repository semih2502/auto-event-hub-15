import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useLanguageStore } from '@/stores';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author_name: string;
  created_at: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const categoryColors: Record<string, string> = {
  news: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  reviews: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  technology: 'bg-green-500/10 text-green-600 border-green-500/20',
  motorsport: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export function BlogCard({ post }: BlogCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const locale = language === 'fr' ? fr : enUS;

  const formattedDate = format(new Date(post.created_at), 'dd MMM yyyy', { locale });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/blog/${post.slug}`}>
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={post.image_url || '/placeholder.svg'}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge
              variant="outline"
              className={`absolute right-3 top-3 ${categoryColors[post.category] || ''}`}
            >
              {t(`blog.categories.${post.category}`)}
            </Badge>
          </div>
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
              <span className="text-muted">•</span>
              <span>{post.author_name}</span>
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-1 text-sm font-medium text-primary">
              {t('blog.readMore')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
