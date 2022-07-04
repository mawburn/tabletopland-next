import Head from 'next/head'
import Image from 'next/image'

import { gql } from '@apollo/client'

import Carousel from '../components/Carousel'
import FooterBar from '../components/FooterBar'
import HeaderBar from '../components/HeaderBar'
import Landing from '../components/Landing'
import client from '../utils/apollo-client'
import { config } from '../utils/config'
import { getGid } from '../utils/getGid'

import type { NextPage } from 'next'
interface HomeProps {
  shop: {
    name: string
    description: string
    shipsToCountries: string[]
  }
  products: Product[]
}

const Home: NextPage<HomeProps> = ({ shop, products }) => (
  <>
    <Head>
      <title>{shop.name}</title>
      <meta name="description" content={shop.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderBar />
    <Landing>
      <section>
        <Carousel products={products} />
      </section>
      <section>
        <Image
          src={`${config.cdn}/images/forest.webp`}
          width={2880}
          height={1267}
          alt="forest"
          layout="responsive"
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP88PT9DQAJLwOe8a6SigAAAABJRU5ErkJggg=="
        />

        <h2 className="p-2 text-primary tracking-widest text-center font-bold text-3xl">
          Sell with us
        </h2>
      </section>
    </Landing>
    <FooterBar />
  </>
)

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetLandingPage {
        shop {
          name
          description
          shipsToCountries
        }
        collectionByHandle(handle: "featured") {
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
      }
    `,
  })

  const { name, shipsToCountries } = data.shop
  const { nodes } = data.collectionByHandle.products

  return {
    props: {
      shop: {
        name,
        shipsToCountries,
      },
      // eslint-disable-next-line
      // @ts-expect-error
      products: nodes.map(p => ({
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
