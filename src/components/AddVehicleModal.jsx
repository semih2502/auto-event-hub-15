import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export default function AddVehicleModal({ onAdd }) {
    const { t } = useTranslation();
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newVehicle = {
            id: Date.now().toString(),
            brand,
            model,
            year: Number(year),
            type,
        };

        // Appelle le callback parent
        onAdd(newVehicle);

    // fermer la modal
    setOpen(false);

        // Réinitialise le formulaire
        setBrand('');
        setModel('');
        setYear('');
        setType('');
    };

    const isFormValid = Boolean(brand.trim() && model.trim() && year.toString().trim() && type.trim() && !Number.isNaN(Number(year)));

    return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t('profile.addVehicle')}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('profile.addVehicleTitle') || 'Ajouter un véhicule'}</DialogTitle>
                    <DialogDescription>
                        {t('profile.addVehicleDescription') || 'Remplissez les informations du véhicule.'}
                    </DialogDescription>
                </DialogHeader>

                <Separator className="my-2" />

                <form id="add-vehicle-form" onSubmit={handleSubmit} className="space-y-4">
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
                    <Button type="submit" form="add-vehicle-form" disabled={!isFormValid}>
                        {t('common.confirm') || 'Ajouter'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
