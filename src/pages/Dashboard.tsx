import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Eye,
  TrendingUp,
  Plus,
  FileText,
  Settings,
  BarChart3,
  Megaphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores';
import { Link } from 'react-router-dom';

const stats = [
  { key: 'totalEvents', value: '12', icon: Calendar, change: '+2 ce mois' },
  { key: 'upcomingEvents', value: '5', icon: TrendingUp, change: '+3 à venir' },
  { key: 'totalUsers', value: '1,234', icon: Users, change: '+125 ce mois' },
  { key: 'totalViews', value: '8,456', icon: Eye, change: '+15%' },
];

const quickActions = [
  { label: 'Créer un événement', icon: Plus, href: '/events/create', color: 'bg-accent' },
  { label: 'Nouvel article', icon: FileText, href: '/blog/create', color: 'bg-primary' },
  { label: 'Gérer les pubs', icon: Megaphone, href: '/dashboard/ads', color: 'bg-green-500' },
  { label: 'Statistiques', icon: BarChart3, href: '/dashboard/analytics', color: 'bg-blue-500' },
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const { profile, role } = useAuthStore();

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="container">

        {/* ===== HEADER ===== */}
        <section aria-label="Header">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold">
                  {t('dashboard.welcome')}, {profile?.full_name || 'Utilisateur'} 👋
                </h1>
                <p className="text-muted-foreground">
                  Voici un aperçu de votre activité sur AutoMeet
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  {role === 'admin' ? 'Administrateur' : 'Membre'}
                </Badge>
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== STATS ===== */}
        <section aria-label="Statistiques" className="mb-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div key={stat.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {t(`dashboard.stats.${stat.key}`)}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== QUICK ACTIONS ===== */}
        <section aria-label="Actions rapides" className="mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="mb-4 font-display text-xl font-semibold">Actions rapides</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.href}>
                  <Card className="cursor-pointer transition-all hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className={`rounded-lg p-3 ${action.color}`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{action.label}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===== RECENT ACTIVITY ===== */}
        <section aria-label="Activité récente">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Recent Events */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {t('dashboard.myEvents')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Cars & Coffee Paris', date: '15 Mars 2024', status: 'active' },
                      { title: 'Track Day Le Mans', date: '22 Mars 2024', status: 'upcoming' },
                    ].map((event, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                          {event.status === 'active' ? 'Actif' : 'À venir'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Link to="/events">
                    <Button variant="outline" className="mt-4 w-full">
                      {t('common.viewAll')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ad Performance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5" />
                    {t('ads.analytics')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="rounded-lg bg-secondary p-3">
                        <p className="text-2xl font-bold">12.5K</p>
                        <p className="text-xs text-muted-foreground">{t('ads.impressions')}</p>
                      </div>
                      <div className="rounded-lg bg-secondary p-3">
                        <p className="text-2xl font-bold">456</p>
                        <p className="text-xs text-muted-foreground">{t('ads.clicks')}</p>
                      </div>
                      <div className="rounded-lg bg-secondary p-3">
                        <p className="text-2xl font-bold">3.6%</p>
                        <p className="text-xs text-muted-foreground">{t('ads.ctr')}</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/dashboard/ads">
                    <Button variant="outline" className="mt-4 w-full">
                      {t('ads.title')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  );
}
