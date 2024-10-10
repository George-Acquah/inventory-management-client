import { cn } from '@/utils/classes.utils';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface _IAvatar {
  src: string | StaticImport;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}
const Avatar = ({ src, alt, width = 36, height = 36, priority, className }: _IAvatar) => {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      width={width}
      height={height}
      className={cn("rounded-full", className)}
    />
  );
};

export default Avatar;