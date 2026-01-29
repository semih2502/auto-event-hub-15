import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Edit } from 'lucide-react';

export default function EditVehicleModal({ vehicle, onUpdate }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [brand, setBrand] = useState(vehicle?.brand || '');
  const [model, setModel] = useState(vehicle?.model || '');
  const [year, setYear] = useState(vehicle?.year ? String(vehicle.year) : '');
  const [type, setType] = useState(vehicle?.type || '');

  useEffect(() => {
    // when opening, ensure fields are synced with the passed vehicle
    if (open && vehicle) {
      setBrand(vehicle.brand || '');
      setModel(vehicle.model || '');
      setYear(vehicle.year ? String(vehicle.year) : '');
      setType(vehicle.type || '');
    }
    // also when vehicle prop changes while open
  }, [open, vehicle]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...vehicle,
      brand,
      model,
      year: Number(year),
      type,
    };

    onUpdate && onUpdate(updated);
    setOpen(false);
  };

  const isFormValid = Boolean(brand.trim() && model.trim() && year.toString().trim() && type.trim() && !Number.isNaN(Number(year)));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          {t('common.edit') || 'Modifier'}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('profile.editVehicleTitle') || 'Modifier le véhicule'}</DialogTitle>
          <DialogDescription>{t('profile.editVehicleDescription') || 'Mettez à jour les informations du véhicule.'}</DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <form id={`edit-vehicle-form-${vehicle?.id || 'new'}`} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Marque</Label>
            <Input value={brand} onChange={(e) => setBrand(e.target.value)} required />
          </div>

          <div>
            <Label>Modèle</Label>
            <Input value={model} onChange={(e) => setModel(e.target.value)} required />
          </div>

          <div>
            <Label>Année</Label>
            <Input value={year} onChange={(e) => setYear(e.target.value)} type="number" required />
          </div>

          <div>
            <Label>Type</Label>
            <Input value={type} onChange={(e) => setType(e.target.value)} required />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t('common.cancel') || 'Annuler'}</Button>
          </DialogClose>
          <Button type="submit" form={`edit-vehicle-form-${vehicle?.id || 'new'}`} disabled={!isFormValid}>
            {t('common.confirm') || 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
