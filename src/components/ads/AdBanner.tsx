import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  position?: 'header' | 'sidebar' | 'footer' | 'inline';
  className?: string;
}

// Placeholder ad data - in production, this would come from the ad management system
const placeholderAds = {
  header: {
    id: 'header-1',
    imageUrl: null,
    text: 'Espace publicitaire disponible - 728x90',
    link: '#',
  },
  sidebar: {
    id: 'sidebar-1',
    imageUrl: null,
    text: 'Espace publicitaire - 300x250',
    link: '#',
  },
  footer: {
    id: 'footer-1',
    imageUrl: null,
    text: 'Publicité partenaire',
    link: '#',
  },
  inline: {
    id: 'inline-1',
    imageUrl: null,
    text: 'Annonce sponsorisée',
    link: '#',
  },
};

export function AdBanner({ position = 'inline', className }: AdBannerProps) {
  const { t } = useTranslation();
  const ad = placeholderAds[position];

  const sizeClasses = {
    header: 'h-[90px] max-w-[728px]',
    sidebar: 'h-[250px] w-[300px]',
    footer: 'h-[90px] w-full max-w-[728px]',
    inline: 'h-[100px] w-full',
  };

  return (
    <div
      className={cn(
        'ad-container mx-auto my-4 overflow-hidden bg-muted/50',
        sizeClasses[position],
        className
      )}
    >
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-xs uppercase tracking-wider opacity-60">
          {t('common.advertisement')}
        </span>
        <span className="text-sm">{ad.text}</span>
      </a>
    </div>
  );
}
