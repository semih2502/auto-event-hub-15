import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Car as CarIcon, Calendar, Settings, Camera, Plus, Trash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditVehicleModal from '@/components/EditVehicleModal';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useAuthStore } from '@/stores';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useViewedProfile from '@/composables/useViewedProfile';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AddVehicleModal from '@/components/AddVehicleModal';


const initialVehicles = [
  { id: '1', brand: 'Porsche', model: '911 GT3', year: 2023, type: 'Sportive' },
  { id: '2', brand: 'BMW', model: 'M3 Competition', year: 2022, type: 'Berline sportive' },
];

const mockUserEvents = [
  { id: '1', title: 'Cars & Coffee Paris', date: '15 Mars 2024', role: 'Participant' },
  { id: '2', title: 'Track Day Le Mans', date: '22 Mars 2024', role: 'Organisateur' },
];


export default function ProfilePage() {
  const { t } = useTranslation();
  const { profile, user, role } = useAuthStore();
  const [searchParams] = useSearchParams();
  const viewedId = searchParams.get('id');

  // Use composable to manage a local editable copy of the profile being viewed
  const { viewedProfile, setField, save, reset, loadById, isLoading } = useViewedProfile();

  // If admin is viewing another profile by ?id=..., load it.
  useEffect(() => {
    if (viewedId) {
      if (role !== 'admin') return; // non-admins cannot view others by id
      loadById(viewedId);
    }
  }, [viewedId, role]);
  const [vehicles, setVehicles] = useState(initialVehicles);

  const viewedFullName = viewedProfile
    ? (viewedProfile.first_name ? `${viewedProfile.first_name} ${viewedProfile.last_name ?? ''}` : viewedProfile.full_name)
    : null;
  const profileFullName = profile
    ? (profile.first_name ? `${profile.first_name} ${profile.last_name ?? ''}` : profile.full_name)
    : null;

  const initials = (viewedFullName || profileFullName)
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="container max-w-4xl">

        {/* ========================= */}
        {/*      HERO SECTION        */}
        {/* ========================= */}
        <section className="mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-primary text-white">
              <CardContent className="p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="font-display text-2xl font-bold">
                        {viewedFullName || profileFullName || 'Utilisateur'}
                      </h1>
                      <p className="text-muted-foreground">
                        {viewedProfile?.email || user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* ========================= */}
        {/*   PROFILE HEADER SECTION  */}
        {/* ========================= */}
        <section className="mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={viewedProfile?.avatar_url || profile?.avatar_url || ''} alt={(viewedFullName || profileFullName) || ''} />
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
                      {profileFullName || 'Utilisateur'}
                    </h1>
                    <div className="mt-1 flex items-center justify-center md:justify-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || ''} alt={profileFullName || user?.email || 'Utilisateur'} />
                        <AvatarFallback className="bg-primary text-sm text-primary-foreground">
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <a href={`mailto:${user?.email}`} className="text-muted-foreground underline" aria-label={`Envoyer un mail à ${user?.email}`}>
                        {user?.email}
                      </a>
                    </div>

                    <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                      <Badge variant="secondary">
                        <CarIcon className="mr-1 h-3 w-3" />
                        {vehicles.length} véhicules
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
        </section>

        {/* ========================= */}
        {/*        STATS SECTION      */}
        {/* ========================= */}
        <section className="mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: CarIcon, value: vehicles.length, label: 'Véhicules' },
                { icon: Calendar, value: mockUserEvents.length, label: 'Événements' },
                { icon: User, value: 'Pro', label: 'Statut' },
                { icon: Settings, value: 'Rapide', label: 'Performances' },
              ].map((stat, idx) => (
                <div key={idx} className="glass rounded-xl p-4 text-center">
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-accent" />
                  <div className="font-display text-2xl font-bold md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ========================= */}
        {/*         TABS SECTION       */}
        {/* ========================= */}
        <section className="mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
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
                  {vehicles.map((vehicle) => (
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
                          <div className="flex items-center space-x-2">
                            <EditVehicleModal
                              vehicle={vehicle}
                              onUpdate={(updated) => setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)))}
                            />

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const ok = window.confirm(t('profile.confirmDelete') || 'Supprimer ce véhicule ?');
                                if (!ok) return;
                                setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
                              }}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add Vehicle Card */}
                  <Card className="border-dashed">
                    <CardContent className="flex h-full min-h-[100px] items-center justify-center p-4">
                      <AddVehicleModal onAdd={(vehicle) => setVehicles((prev) => [vehicle, ...prev])} />
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
        </section>
      </div>
    </div>
  );
}
