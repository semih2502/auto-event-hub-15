import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Car as CarIcon, Calendar, Settings, Camera, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores';

const mockVehicles = [
  { id: '1', brand: 'Porsche', model: '911 GT3', year: 2023, type: 'Sportive' },
  { id: '2', brand: 'BMW', model: 'M3 Competition', year: 2022, type: 'Berline sportive' },
];

const mockUserEvents = [
  { id: '1', title: 'Cars & Coffee Paris', date: '15 Mars 2024', role: 'Participant' },
  { id: '2', title: 'Track Day Le Mans', date: '22 Mars 2024', role: 'Organisateur' },
];

export default function ProfilePage() {
  const { t } = useTranslation();
  const { profile, user } = useAuthStore();

  const initials = profile?.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="container max-w-4xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute -bottom-1 -right-1 rounded-full bg-accent p-2 text-white shadow-lg transition-transform hover:scale-110">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-display text-2xl font-bold">
                    {profile?.full_name || 'Utilisateur'}
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                    <Badge variant="secondary">
                      <CarIcon className="mr-1 h-3 w-3" />
                      {mockVehicles.length} véhicules
                    </Badge>
                    <Badge variant="secondary">
                      <Calendar className="mr-1 h-3 w-3" />
                      {mockUserEvents.length} événements
                    </Badge>
                  </div>
                </div>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  {t('profile.settings')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="vehicles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vehicles" className="gap-2">
                <CarIcon className="h-4 w-4" />
                {t('profile.myVehicles')}
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2">
                <Calendar className="h-4 w-4" />
                {t('profile.myEvents')}
              </TabsTrigger>
            </TabsList>

            {/* Vehicles Tab */}
            <TabsContent value="vehicles">
              <div className="grid gap-4 md:grid-cols-2">
                {mockVehicles.map((vehicle) => (
                  <Card key={vehicle.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display font-semibold">
                            {vehicle.brand} {vehicle.model}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.year} • {vehicle.type}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {t('common.edit')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Vehicle Card */}
                <Card className="border-dashed">
                  <CardContent className="flex h-full min-h-[100px] items-center justify-center p-4">
                    <Button variant="ghost" className="gap-2">
                      <Plus className="h-4 w-4" />
                      {t('profile.addVehicle')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="space-y-4">
                {mockUserEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Badge variant={event.role === 'Organisateur' ? 'default' : 'secondary'}>
                        {event.role}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}

                {mockUserEvents.length === 0 && (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">{t('profile.noEvents')}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
