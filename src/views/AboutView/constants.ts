// @ts-nocheck
import AboutImage1 from '@/shared/assets/images/about-page/about-1.jpg';
import AboutImage2 from '@/shared/assets/images/about-page/about-2.jpg';
import AboutImage3 from '@/shared/assets/images/about-page/about-3.jpg';
import AboutImage4 from '@/shared/assets/images/about-page/about-4.jpg';
import AboutImage5 from '@/shared/assets/images/about-page/about-5.webp';
import AboutImage6 from '@/shared/assets/images/about-page/about-6.webp';
import { TFunction } from 'next-i18next';

export const getAboutBrandSections = (t: TFunction) => [
  {
    title: t('banner.bloc.title'),
    list: [
      t('banner.bloc.text'),
      t('banner.bloc.text1'),
      t('banner.bloc.text2'),
    ],
    image: AboutImage1,
  }, {
    title: t('banner.bloc1.title'),
    list: [
      t('banner.bloc1.text'),
      t('banner.bloc1.text1'),
      t('banner.bloc1.text2'),
      t('banner.bloc1.text3'),
    ],
    image: AboutImage2,
  }, {
    title: t('banner.bloc2.title'),
    list: [
      t('banner.bloc2.text'),
      t('banner.bloc2.text1'),
      t('banner.bloc2.text2'),
      t('banner.bloc2.text3'),
      t('banner.bloc2.text4'),
    ],
    image: AboutImage5,
  }, {
    title: t('banner.bloc3.title'),
    list: [
      t('banner.bloc3.text'),
      t('banner.bloc3.text1'),
      t('banner.bloc3.text2'),
      t('banner.bloc3.text3'),
      t('banner.bloc3.text4'),
    ],
    image: AboutImage3,
  }, {
    title: t('banner.bloc4.title'),
    list: [
      t('banner.bloc4.text'),
      t('banner.bloc4.text1'),
      t('banner.bloc4.text2'),
    ],
    image: AboutImage5,
  }, {
    title: t('banner.bloc5.title'),
    list: [
      t('banner.bloc5.text'),
      t('banner.bloc5.text1'),
      t('banner.bloc5.text2'),
      t('banner.bloc5.text3'),
    ],
    image: AboutImage4,
  },
];

export const aboutBrandSections = [
  {
    title: 'Качественная элегантнаяодежда для Мужчин и Женщин',
    list: [
      'Удобные лекала и качественный пошив',
      'Современный концепт магазинов',
      'Сервис, превосходящий ожидания',
    ],
    image: AboutImage1,
  }, {
    title: 'Вертикально-интегрированная компания',
    list: [
      'Полный цикл разработки и создания продукта',
      'Производим и продаем мужскую и женскую одежду в среднем ценовом сегменте',
      'Разветвленная сеть магазинов и продажи онлайн через собственный маркетплейс',
      'Собственное производство по пошиву ключевого ассортимента',
    ],
    image: AboutImage2,
  }, {
    title: 'Высокий уровень сервиса',
    list: [
      'Разветвлённая сеть фирменных магазиновс продуманным концептом',
      'Постоянно растущий уровень квалификации продавцов',
      'Удобная программа лояльности с омниканальным клиентским сервисом',
      'Дополнительные услуги: ателье, индивидуальный пошив, индивидуальный консультант',
      'Активная работа с обратной связью от клиентов',
    ],
    image: AboutImage3,
  }, {
    title: 'Эффективный товарный ассортимент',
    list: [
      'Изучение потребностей клиентов',
      'Поиск и реализация актуальных дизайнерских решений',
      'Системное обеспечение базовым ассортиментом, чтобы дать возможность клиенту найти нужную вещь в любое время',
      'Дополнительные услуги: ателье, индивидуальный пошив, индивидуальный консультант',
      'Помогать людям создавать элегантный образ,сочетая базовые вещи и новинки из сезонных коллекций',
    ],
    image: AboutImage4,
  }, {
    title: 'Технологичность организации бизнеса',
    list: [
      'Использование современных автоматизированных систем управления производством и логистикой',
      'Передовые технологии анализа клиентского опыта и управления продажами',
      'Диджитал-инструменты масштабирования онлайн',
    ],
    image: AboutImage5,
  }, {
    title: 'Выбираем технологичные материалы',
    list: [
      'Используем самые современныеи качественные ткани и материалы',
      'Внедряем передовые технологии производства и разработки одежды',
      'Приобретаем материалы и готовую продукцию только у производителей',
      'Производство на собственных фабриках',
    ],
    image: AboutImage6,
  },
];
