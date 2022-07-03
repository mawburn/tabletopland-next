import Head from 'next/head'

import { gql } from '@apollo/client'

import HeaderBar from '../components/HeaderBar'
import Landing from '../components/Landing'
import client from '../utils/apollo-client'

import type { NextPage } from 'next'
import FooterBar from '../components/FooterBar'
import Carousel from '../components/Carosel'
import { getGid } from '../utils/getGid'

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
    <Landing />
    <Carousel products={products} />
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
        collection(handle: "featured") {
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
  const { nodes } = data.collection.products

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
