import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { Product } from '@/entities/Product';
import { Certificate } from '@/entities/Certificate';

export type CertificateDto = {
  products: Product[];
  breadcrumbs: Breadcrumb[];
};

export type CertificatesData = {
  breadcrumbs: Breadcrumb[];
  certificates: Certificate[];
}
