import Image from 'next/image'
import { config } from '../../utils/config'
import styles from './styles.module.css'

const FooterBar = ({}) => (
  <footer className={styles.footer}>
    <div className={styles.footerInfo}>
      <section>
        <h2 className="pb-2">Social Media</h2>
        <ul className={styles.socialList}>
          <li>
            <a href="https://instagram.com/twitter" target="_new">
              <span className="icon-twitter" aria-label="twitter" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/tabletopland" target="_new">
              <span className="icon-instagram" aria-label="instagram" />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/tabletopland" target="_new">
              <Image src="/img/youtube.svg" width={34} height={24} alt="YouTube" />
            </a>
          </li>
          <li>
            <a href="https://github.com/mawburn/tabletopland-next" target="_new">
              <span className="icon-github" aria-label="github repo" />
            </a>
          </li>
          <li>
            <a href="https://mawburn.com" target="_new">
              <span className="icon-tool" aria-label="built by mawburn" />
            </a>
          </li>
        </ul>
        <div className={styles.owners}>
          <h3>Mom &amp; Pop Owned</h3>
          <div className="flex gap-3 justify-center items-center">
            <a href="https://instagram.com/viertastable">
              <Image src={`${config.cdn}/images/Vierta.webp`} alt="Vierta" width={80} height={80} />
              <p className="w-full text-center font-bold">Vierta</p>
            </a>
            <a href="https://instagram.com/_mawburn">
              <Image src={`${config.cdn}/images/Matt.webp`} alt="Matt" width={80} height={80} />
              <p className="w-full text-center font-bold">Matt</p>
            </a>
          </div>
        </div>
      </section>
      <section>
        <h2 style={{ textAlign: 'left' }} className="pb-2">
          Quick Links
        </h2>
        <ul className="w-full text-xs">
          <li className="py-1">Become a vendor</li>
          <li className="py-1">Refund Policy</li>
          <li className="py-1">Privacy Policy</li>
          <li className="py-1">Terms of Service</li>
          <li className="py-1">Do not sell my personal information</li>
        </ul>
      </section>
      <section className="sm:mr-4 mr-0">
        <h2 style={{ textAlign: 'left' }}>Contact Us</h2>
        <p>
          <strong>Email:</strong> <a href="mailto:support@tabletop.land">support@tabletop.land</a>
        </p>
        <address className="w-full">
          <p>
            <br />
            TabletopLand LLC
            <br />
            2191 Ebenezer Rd.
            <br />
            P.O. Box 38147
            <br />
            Rock Hill, SC 29732
          </p>
        </address>
      </section>
    </div>
    <section className={styles.bottom}>
      <div>
        © {new Date().getFullYear()} TabletopLand LLC.{' '}
        <a href="https://www.shopify.com/" target="_new">
          Powered by Shopify
        </a>
        .
      </div>
      <div className={styles.cards}>
        <Image
          src="/img/cc/amex.svg"
          alt="American Express"
          width={38}
          height={24}
          loading="lazy"
        />
        <Image
          src="/img/cc/discover.svg"
          alt="Discover Card"
          width={38}
          height={24}
          loading="lazy"
        />
        <Image
          src="/img/cc/mastercard.svg"
          alt="Mastercard"
          width={38}
          height={24}
          loading="lazy"
        />
        <Image src="/img/cc/visa.svg" alt="Visa" width={38} height={24} loading="lazy" />
        <Image src="/img/cc/shoppay.svg" alt="Shop Pay" width={38} height={24} loading="lazy" />
        <Image src="/img/cc/paypal.svg" alt="Paypal" width={38} height={24} loading="lazy" />
      </div>
    </section>
  </footer>
)

export default FooterBar
