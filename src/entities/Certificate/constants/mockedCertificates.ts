import { faker } from '@faker-js/faker';
import CertificateImageTest1 from '@/shared/assets/images/certificates/certificate1.jpg';
import CertificateImageTest2 from '@/shared/assets/images/certificates/certificate2.jpg';
import CertificateImageTest3 from '@/shared/assets/images/certificates/certificate3.jpg';
import CertificateImageTest4 from '@/shared/assets/images/certificates/certificate4.jpg';
import { Certificate } from '../model/types';
import { getMockPrice } from '@/shared/lib/mock/price';

export const mockedCertificate: Certificate = {
  id: faker.datatype.uuid(),
  title: 'Подарочный сертификат Arber',
  href: faker.random.word(),
  image: CertificateImageTest1,
  price: getMockPrice(),
};

export const mockedCertificates: Certificate[] = [
  {
    id: faker.datatype.uuid(),
    title: 'Подарочный сертификат Arber',
    href: faker.random.word(),
    image: CertificateImageTest1,
    price: getMockPrice(),
  }, {
    id: faker.datatype.uuid(),
    title: 'Подарочный сертификат Arber',
    href: faker.random.word(),
    image: CertificateImageTest2,
    price: getMockPrice(),
  }, {
    id: faker.datatype.uuid(),
    title: 'Подарочный сертификат Arber',
    href: faker.random.word(),
    image: CertificateImageTest3,
    price: getMockPrice(),
  }, {
    id: faker.datatype.uuid(),
    title: 'Подарочный сертификат Arber',
    href: faker.random.word(),
    image: CertificateImageTest4,
    price: getMockPrice(),
  },
];
