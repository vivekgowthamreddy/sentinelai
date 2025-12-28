import type { InfoCardProps } from '../types/schema';

const InfoCard = ({ title, value, status }: InfoCardProps) => {
  const getStatusColor = () => {
    if (!status) return 'text-(--color-text-primary)';
    switch (status) {
      case 'Active':
        return 'text-(--color-success)';
      case 'Warning':
        return 'text-(--color-warning)';
      case 'Inactive':
        return 'text-(--color-text-muted)';
      default:
        return 'text-(--color-text-primary)';
    }
  };

  const getGlowClass = () => {
    switch (status) {
      case 'Active': return 'card-glow-emerald';
      case 'Warning': return 'card-glow-amber';
      case 'Inactive': return 'card-glow-rose';
      default: return 'card-glow';
    }
  };

  return (
    <div className={`card p-5 sm:p-6 card-hover ${getGlowClass()}`}>
      <h3 className="text-sm font-medium text-(--color-text-secondary) mb-1.5">
        {title}
      </h3>
      <p className={`text-xl sm:text-2xl font-semibold ${getStatusColor()}`}>
        {value}
      </p>
    </div>
  );
};

export default InfoCard;