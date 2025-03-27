import { Typography } from '@/shared/ui/Typography';

interface ErrorMessageProps {
  className?: string;
  error: string;
  id?: string;
}

export const ErrorMessage = ({
  error,
  className,
  id,
}: ErrorMessageProps) => (
  <Typography
    id={id}
    aria-live="assertive"
    className={className}
    variant="body-3"
    color="red"
  >
    {error}
  </Typography>
);
