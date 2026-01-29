import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useEventsStore } from '@/stores/eventsStore';
import { useToast } from '@/hooks/use-toast';

export default function CreateEventPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addEvent = useEventsStore((s) => s.addEvent);
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'meeting' | 'race' | 'salon' | 'rally' | 'auction'>('meeting');
  const [maxParticipants, setMaxParticipants] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [isFeatured, setIsFeatured] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !date || !location) {
      toast({ title: t('createEvent') || 'Créer un événement', description: 'Veuillez remplir les champs obligatoires.' });
      return;
    }

    const newEvent = {
      id: String(Date.now()),
      title,
      description,
      date,
      location,
      address,
      image_url: imageUrl,
      category,
      organizer_id: 'local',
      organizer_name: 'Vous',
      current_participants: 0,
      max_participants: maxParticipants || 0,
      is_featured: isFeatured,
      created_at: new Date().toISOString(),
    };

    addEvent(newEvent as any);

    toast({ title: t('createEvent') || 'Créer un événement', description: t('events.created') || 'Événement créé.' });
    navigate('/events');
  }

  return (
    <div className="container py-12">
      <h1 className="mb-6 font-display text-3xl font-bold">{t('createEvent')}</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="title">{t('events.title') || 'Titre'}</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="date">{t('events.date') || 'Date'}</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">{t('events.description') || 'Description'}</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
        </div>

        <div>
          <Label htmlFor="location">{t('events.location') || 'Lieu'}</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div>
          <Label htmlFor="address">{t('events.address') || 'Adresse'}</Label>
          <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="image">{t('events.image') || 'Image (URL)'}</Label>
          <Input id="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="category">{t('events.category') || 'Catégorie'}</Label>
          <select id="category" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value as any)}>
            <option value="meeting">{t('events.categories.meeting') || 'Rassemblement'}</option>
            <option value="race">{t('events.categories.race') || 'Course'}</option>
            <option value="salon">{t('events.categories.salon') || 'Salon'}</option>
            <option value="rally">{t('events.categories.rally') || 'Rallye'}</option>
            <option value="auction">{t('events.categories.auction') || 'Vente aux enchères'}</option>
          </select>
        </div>

        <div>
          <Label htmlFor="max">{t('events.maxParticipants') || 'Participants max'}</Label>
          <Input id="max" type="number" value={maxParticipants ?? ''} onChange={(e) => setMaxParticipants(e.target.value ? Number(e.target.value) : undefined)} />
        </div>

        <div>
          <Label htmlFor="price">{t('events.price') || 'Prix'}</Label>
          <Input id="price" type="number" value={price ?? ''} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)} />
        </div>

        <div className="md:col-span-2 flex items-center gap-4">
          <Checkbox id="featured" checked={isFeatured} onCheckedChange={(v) => setIsFeatured(Boolean(v))} />
          <Label htmlFor="featured">{t('events.featured') || 'En vedette'}</Label>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" className="btn-accent">{t('createEvent')}</Button>
        </div>
      </form>
    </div>
  );
}
