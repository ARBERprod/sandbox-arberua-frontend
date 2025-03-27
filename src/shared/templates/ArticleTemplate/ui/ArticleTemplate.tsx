import Image from 'next/image';
import styles from './ArticleTemplate.module.scss';
import Banner from '@/shared/assets/images/template/banner.png';
import Banner2 from '@/shared/assets/images/template/banner2.png';
import BannerMob from '@/shared/assets/images/template/banner_mob.png';
import { Slider } from '@/shared/ui/Slider';
import cn from 'classnames';

export const ArticleTemplate = () => {
  const slides = [
    {
      id: 1,
      slide: <Image src={Banner} alt="Article Image" />,
    },
    {
      id: 2,
      slide: <Image src={Banner2} alt="Article Image" />,
    },
  ];

  return (
    <div className={styles.container}>

      <div className={styles.imageBlock}>
        <div className={styles.textBlock}>
          <h1>MUST-HAVE ОСЕНІ 2024: ЧОЛОВІЧІТА Ж ІНОЧІТРЕНДИ</h1>
          <p>
            МОДА 2024 РОКУ ВИБУХАЄ НОВИМИ ІДЕЯМИ,ПОВЕРТАЮЧИ НА ПОДІУМИ ЕЛЕМЕНТИ,ПРО ЯКІМИ,ЗДАВАЛОСЯ Б,ВЖЕ
            ЗАБУЛИ. ЦЕЧАС СМІЛИВИХРІШЕНЬ,КОЛИ КОЖНЕВАШЕ«Я» ЗНАХОДИТЬ ВІДОБРАЖЕННЯ В ОДЯЗІ. ЗАБУДЬТЕ ПРО
            ОДНОМАНІТНІСТЬ – НАСТАВ МОМЕНТ ЕКСПЕРИМЕНТУВАТИ, ДОДАЮЧИ НОТКИ ЗУХВАЛОСТІ ТА НЕОРДИНАРНОСТІ
            ДО СВОГО ПОВСЯКДЕННОГО СТИЛЮ.
          </p>
        </div>
        <Image
          src={Banner}
          alt="Article Image"
          className={styles.imageDesktop}
        />
        <Image
          src={BannerMob}
          alt="Article Image"
          className={styles.imageMobile}
        />
      </div>

      <div className={styles.sliderBlock}>
        <div className={styles.textBlock2}>
          <h2>MUST-HAVE ОСЕНІ 2024: ЧОЛОВІЧІТА Ж ІНОЧІТРЕНДИ</h2>
          <p>
            Стає справжнім хітом серед елементів гардеробу.
            Його універсальність дозволяєстворюватиобрази,якілегко інтегруються у будь-яке середовище.
            Для жінок поло може стати ключовим елементомупоєднаннізтрикотажними костюмами або елегантними
            сатиновимиспідницямиміді,створюючи контрасти, які привертають увагу. Чоловіки можуть сміливо
            комбінувати поло з бомберами,щоб підкреслити свою індивідуальність і виглядати стильно, навіть
            у найнесподіваніших ситуаціях.
          </p>
        </div>
        <div className={styles.imageBlock2}>
          <Image
            src={Banner}
            alt="Article Image"
          />
          <Image
            src={Banner}
            alt="Article Image"
          />
        </div>
        <Slider paginationActive className={styles.slider} slides={slides} />
      </div>

      <div className={cn(styles.sliderBlock, styles.sliderBlock2)}>
        <div className={styles.textBlock2}>
          <h2>
            <span>А як щодо</span>
            “ТРИКОТАЖНИХ КОСТЮМІВ”?
          </h2>
          <p>
            Вони переживають справжнє відродження, втілюючи комфорт у найвишуканішійформі.
            Уявіть себеум’якомут рикотажному костюмі,що огортає васзатишкомідару євідчуттявпевн еностіукожномурусі.
            Жіночі моделістають справжньою знахідкою для тих,хто прагне виглядати неперевершено навіть у
            прохолодну пору.Чоловіки можуть поєднати трикотажніш танизбомбером,додаючио бразустильногос учасногошарму.
          </p>
        </div>
        <div className={styles.imageBlock2}>
          <Image
            src={Banner}
            alt="Article Image"
          />
          <Image
            src={Banner}
            alt="Article Image"
          />
        </div>
        <Slider paginationActive className={styles.slider} slides={slides} />
      </div>

      <div className={styles.sliderBlock}>
        <div className={styles.textBlock2}>
          <h2>“САТИНОВІ СПІДНИЦІ МІДІ”</h2>
          <p>
            – це ваша можливість показати, наскільки елегантною і жіночною ви можетебути.
            Їх ніплавні лінії та розкішний блискстають основою образів,що запамятовуються.
            Комбінуйте їх із затишними трикотажними светрами або трендовими поло – і ви отримаєте образ,
            який буде виглядати не тільки стильно, а й невимушено.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <Image
            src={Banner}
            alt="Article Image"
            className={styles.imageDesktop}
          />
          <Image
            src={BannerMob}
            alt="Article Image"
            className={styles.imageMobile}
          />
        </div>
      </div>

      <div className={styles.block}>
        <div className={cn(styles.textBlock2, styles.textBlockColumn)}>
          <h2>
            <span>І, звісно, варто відзначити</span>
            “ДІЛОВИЙ СТИЛЬ” -
          </h2>
          <p>
            – це ваша можливість показати, наскільки елегантною і жіночною ви можетебути.
            Їх ніплавні лінії та розкішний блискстають основою образів,що запамятовуються.
            Комбінуйте їх із затишними трикотажними светрами або трендовими поло – і ви отримаєте образ,
            який буде виглядати не тільки стильно, а й невимушено.
          </p>
        </div>
        <div className={styles.imageBlock}>
          <Image
            src={Banner}
            alt="Article Image"
            className={styles.imageDesktop}
          />
          <Image
            src={BannerMob}
            alt="Article Image"
            className={styles.imageMobile}
          />
        </div>
      </div>
    </div>
  );
};
