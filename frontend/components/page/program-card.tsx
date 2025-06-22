'use client';

import Link from 'next/link';
import Image from 'next/image';
import { StrapiDataItem, ProgramKerja } from '@/lib/types';
import { getStrapiMediaUrl } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProgramCardProps {
  program: StrapiDataItem<ProgramKerja>;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const { name, status, main_image, department } = program.attributes;
  const imageUrl = getStrapiMediaUrl(main_image.data);
  const departmentName = department.data?.attributes.name;

  const statusVariant = (): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Ongoing': return 'secondary';
      case 'Planned': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Link href={`/program-kerja/${program.id}`} className="block group bg-card p-4 rounded-lg border shadow-sm transition-all hover:shadow-md">
      <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-200 mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Image for ${name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={statusVariant()}>{status}</Badge>
        </div>
      </div>
      {departmentName && (
        <p className="text-sm text-muted-foreground mb-1">{departmentName}</p>
      )}
      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
    </Link>
  );
}
