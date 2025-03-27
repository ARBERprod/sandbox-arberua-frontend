import { memo } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { routerPaths } from '@/shared/config/router';
import { LookBuilderHero } from '@/widgets/LookBuilder';
import styles from './LookConstructorView.module.scss';
import { lookConstructorReducer } from '../../model/slices/lookConstructorSlice';
import { LookConstructorSidebar } from '../LookConstructorSidebar';
import { lookConstructorSelectors } from '../../model/selectors/lookConstructorSelectors';

interface LookConstructorViewProps {
  className?: string;
}

export const LookConstructorView = memo(({ className }: LookConstructorViewProps) => {
  const { push } = useRouter();
  const {
    jacket,
    shoes,
    trousers,
    base,
    coat,
  } = useSelector(lookConstructorSelectors.getClothesImages);

  const buyLookHandler = () => {
    push(routerPaths.chosen_look);
  };

  return (
    <DynamicModuleLoader reducers={{ lookConstructor: lookConstructorReducer }}>
      <div className={cn(styles.root, className)}>
        <LookBuilderHero
          base={base}
          coat={coat}
          jacket={jacket}
          shoes={shoes}
          trousers={trousers}
          onBtnClick={buyLookHandler}
          className={styles.hero}
        />
        <LookConstructorSidebar />
      </div>
    </DynamicModuleLoader>
  );
});
