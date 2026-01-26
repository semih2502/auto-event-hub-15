import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogCard, type BlogPost } from '@/components/blog';
import { AdBanner } from '@/components/ads';

const categories = ['all', 'news', 'reviews', 'technology', 'motorsport'];

// Mock data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'La nouvelle Ferrari 296 GTB dévoilée au Salon de Genève',
    excerpt: 'Ferrari présente sa dernière création hybride rechargeable, combinant un V6 turbo avec un moteur électrique.',
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
    excerpt: 'Nous avons pu tester la nouvelle 911 GT3 RS sur le circuit de Spa-Francorchamps.',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f373e?w=800&auto=format',
    category: 'reviews',
    author_name: 'Marie Martin',
    created_at: '2024-02-25',
    slug: 'essai-porsche-911-gt3-rs',
  },
  {
    id: '3',
    title: 'Les batteries solides: l\'avenir de la mobilité électrique',
    excerpt: 'Les constructeurs automobiles investissent massivement dans la technologie des batteries solides.',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format',
    category: 'technology',
    author_name: 'Pierre Bernard',
    created_at: '2024-02-22',
    slug: 'batteries-solides-avenir',
  },
  {
    id: '4',
    title: 'F1 2024: Les forces en présence',
    excerpt: 'Analyse complète des écuries et pilotes pour la nouvelle saison de Formule 1.',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800&auto=format',
    category: 'motorsport',
    author_name: 'Sophie Leblanc',
    created_at: '2024-02-20',
    slug: 'f1-2024-analyse',
  },
  {
    id: '5',
    title: 'BMW M3 Touring: Le break sportif ultime',
    excerpt: 'Essai complet de la première M3 break de l\'histoire de BMW.',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format',
    category: 'reviews',
    author_name: 'Thomas Mercier',
    created_at: '2024-02-18',
    slug: 'bmw-m3-touring-essai',
  },
  {
    id: '6',
    title: 'Législation Euro 7: Ce qui va changer',
    excerpt: 'Les nouvelles normes européennes d\'émissions et leur impact sur l\'industrie.',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format',
    category: 'news',
    author_name: 'Julie Moreau',
    created_at: '2024-02-15',
    slug: 'euro-7-legislation',
  },
];

export default function BlogPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
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
              {t('blog.latestNews')}
            </Badge>
            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              {t('blog.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              {t('blog.subtitle')}
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
                {t(`blog.categories.${cat}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Sidebar Ad */}
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">Aucun article trouvé</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AdBanner position="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
