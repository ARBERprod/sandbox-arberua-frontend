import { memo } from 'react';
import cn from 'classnames';
import { LookBuilderHero, LookBuilderSidebar } from '@/widgets/LookBuilder';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import styles from './ChosenLookView.module.scss';
import { ChosenLook } from '../ChosenLook';

interface ChosenLookViewProps {
  className?: string;
}

export const ChosenLookView = memo(({ className }: ChosenLookViewProps) => {
  const { push } = useRouter();
  const goToConstructor = () => {
    push(routerPaths.look_constructor);
  };
  return (
    <div className={cn(styles.root, className)}>
      <LookBuilderHero
        onCanvasClick={goToConstructor}
        className={styles.hero}
        coat={null}
        jacket={null}
        base={null}
        trousers={null}
        shoes={null}
      />
      <LookBuilderSidebar>
        <ChosenLook />
      </LookBuilderSidebar>
    </div>
  );
});
