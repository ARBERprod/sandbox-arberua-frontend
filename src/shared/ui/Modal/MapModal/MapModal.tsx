import cn from 'classnames';
import { OverlayingModal } from '@/shared/ui/Modal';
import { Svg } from '@/shared/ui/Svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Typography } from '@/shared/ui/Typography';
import { Map } from '@/shared/ui/Map';
import { ModalProps } from '../types/ModalProps';
import styles from './MapModal.module.scss';

interface MapModalProps extends ModalProps {
  className?: string;
  classes?: {
    wrapper?: string;
  };
  title: string;
  center: {
    lng: number;
    lat: number;
  };
}

export const MapModal = ({
  className, classes, title, center, ...modalProps
}: MapModalProps) => (
  <OverlayingModal {...modalProps} width={modalProps.width || 750} unmountOnClose className={className}>
    <div className={cn(styles.root, classes?.wrapper)}>
      <div className={styles.head}>
        <Typography variant="title-5" centered>{title}</Typography>
        <button className={styles.closeBtn} onClick={modalProps.onClose}>
          <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
        </button>
      </div>
      <div className={styles.map}>
        <Map center={center} markers={[center]} options={{ zoom: 15 }} />
      </div>
    </div>
  </OverlayingModal>
);
