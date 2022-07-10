import Head from 'next/head'
import Image from 'next/image'

import { gql } from '@apollo/client'

import Carousel from '../components/Carousel'
import FooterBar from '../components/FooterBar'
import HeaderBar from '../components/HeaderBar'
import Landing from '../components/Landing'
import LinkButton from '../components/LinkButton'
import client from '../utils/apollo-client'
import { config } from '../utils/config'
import { getGid } from '../utils/getGid'

import type { NextPage } from 'next'
import Link from 'next/link'
import { getTitle } from '../utils/getTitle'
interface HomeProps {
  shop: {
    description: string
    shipsToCountries: string[]
  }
  featured: Product[]
  newItems: Product[]
}

const Home: NextPage<HomeProps> = ({ featured, newItems }) => (
  <>
    <Head>
      <title>{getTitle()}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderBar />
    <Landing>
      <section>
        <Carousel products={featured} title="Some of our vendors’ products" />
      </section>
      <section className="flex flex-wrap py-4 my-4 drop-shadow-lg	justify-center items-center bg-gradient-to-b from-stone-600 to-stone-800">
        <div className="sm:w-96 max-w-[90%] w-full">
          <Image
            src={`${config.cdn}/images/merchant.webp`}
            width={500}
            height={339}
            alt="Tabletop Merchant"
            layout="responsive"
            quality={100}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP88PT9DQAJLwOe8a6SigAAAABJRU5ErkJggg=="
          />
        </div>

        <div className="flex flex-col items-center sm:w-fit sm:ml-8 w-full">
          <h2 className="p-2 text-white tracking-widest text-center font-bold text-3xl">
            Sell with us
          </h2>
          <p className="text-center text-white pb-4">
            Do you make things?
            <br />
            Have too much terrain sitting around?
            <br />
            Why not sell it? Better than collecting dust!
          </p>
          <LinkButton href="https://sell.tabletop.land" secondary>
            Become a vendor
          </LinkButton>
        </div>
      </section>
      <section className="flex flex-col items-center m-4">
        <article className="max-w-prose">
          <h2 className="mb-4">Who we are &amp; what we offer</h2>
          <p className="indent-4">
            We are a multi-vendor marketplace, much like many other multi-vendor marketplaces on the
            internet. However, unlike the others we specialize in tabletop gaming supplies &amp;
            accessories for <strong>tabletop role-playing games</strong> (<strong>ttrpgs</strong>),
            <strong>wargames</strong>, <strong>skirmish games</strong>, <strong>board games</strong>
            , &amp; accessories to build your own. Many of our products are handmade, but we also
            offer other supplies.
          </p>
          <p className="mt-2 indent-4">
            We handle marketing &amp; shipping for vendors in order to make it as easy as possible
            to get your stuff out the door. We offer a low fixed rate commission of <u>only 10%</u>!{' '}
            <strong>So that means vendors take 90% of the listing price plus taxes!</strong> On top
            of that, shipping is not included in the commission &amp; is paid for by the consumer
            &amp; we send the shipping label directly to the vendor at no charge.
          </p>
        </article>
        <article className="mt-4 max-w-prose">
          <h2 className="mb-4">What is a multi-vendor marketplace?</h2>
          <p className="indent-4">
            To put it simply, it’s products and/or items that are sold by individual vendors. Some
            of these vendors are just ordinary people clearing their shelves &amp; some are small
            businesses. If you make stuff &amp; want to join the family,{' '}
            <u>
              <Link href="https://seller.tabletop.land">see more information here</Link>
            </u>
            .
          </p>
        </article>
      </section>
      <section>
        <Carousel products={newItems} title="Newest products" />
      </section>
      <div className="py-6 text-center">
        <Image
          src="/img/logo-250.png"
          width={175}
          height={175}
          loading="lazy"
          alt="Tabletop Logo"
        />
      </div>
    </Landing>
    <FooterBar />
  </>
)

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query GetLandingPage {
        shop {
          description
          shipsToCountries
        }
        featured: collection(handle: "featured") {
          products(first: 10, sortKey: MANUAL) {
            nodes {
              id
              description
              seo {
                description
                title
              }
              title
              productType
              tags
              vendor
              priceRange {
                maxVariantPrice {
                  amount
                }
                minVariantPrice {
                  amount
                }
              }
              featuredImage {
                altText
                width
                height
                url
              }
            }
          }
        }
        newItems: collection(handle: "new") {
          products(first: 20) {
            nodes {
              id
              description
              seo {
                description
                title
              }
              title
              productType
              tags
              vendor
              priceRange {
                maxVariantPrice {
                  amount
                }
                minVariantPrice {
                  amount
                }
              }
              featuredImage {
                altText
                width
                height
                url
              }
            }
          }
        }
      }
    `,
  })

  const { name, shipsToCountries } = data.shop

  const featured = data.featured.products.nodes
  const newItems = data.newItems.products.nodes

  return {
    props: {
      shop: {
        name,
        shipsToCountries,
      },
      // eslint-disable-next-line
      // @ts-expect-error
      featured: featured.map(p => ({
        id: getGid(p.id),
        title: p.title,
        description: p.description,
        productType: p.productType,
        tags: p.tags,
        vendor: p.vendor,
        price: {
          max: p.priceRange.maxVariantPrice.amount,
          min: p.priceRange.minVariantPrice.amount,
        },
        featuredImage: {
          altText: p.featuredImage.altText,
          width: p.featuredImage.width,
          height: p.featuredImage.height,
          url: p.featuredImage.url,
        },
      })),
      // eslint-disable-next-line
      // @ts-expect-error
      newItems: newItems.map(p => ({
        id: getGid(p.id),
        title: p.title,
        description: p.description,
        productType: p.productType,
        tags: p.tags,
        vendor: p.vendor,
        price: {
          max: p.priceRange.maxVariantPrice.amount,
          min: p.priceRange.minVariantPrice.amount,
        },
        featuredImage: {
          altText: p.featuredImage.altText,
          width: p.featuredImage.width,
          height: p.featuredImage.height,
          url: p.featuredImage.url,
        },
      })),
    },
  }
}

export default Home
