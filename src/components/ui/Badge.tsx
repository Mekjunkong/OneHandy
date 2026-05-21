import { cn } from '@/lib/utils';

interface BadgeProps {
  type: 'FIXED' | 'QUOTE';
  className?: string;
}

export function Badge({ type, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-semibold tracking-widest uppercase rounded-sm',
        type === 'FIXED'
          ? 'bg-gold/20 text-gold border border-gold/40'
          : 'bg-muted/10 text-muted border border-muted/30',
        className
      )}
    >
      {type}
    </span>
  );
}
