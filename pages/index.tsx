import Head from 'next/head'

import { gql } from '@apollo/client'

import FooterBar from '../components/FooterBar'
import HeaderBar from '../components/HeaderBar'
import client from '../utils/apollo-client'
import { getGid } from '../utils/getGid'

import type { NextPage } from 'next'
// import Link from 'next/link'
import { getTitle } from '../utils/getTitle'
import { getPrice } from '../utils/getPrice'
import { Collection } from '../components/Collection'

interface HomeProps {
  shop: {
    shipsToCountries: string[]
  }
  products: Product[]
}

const Home: NextPage<HomeProps> = ({ products }) => (
  <>
    <Head>
      <title>{getTitle()}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderBar />
    <main className="h-fit">
      <Collection products={products} />
    </main>
    <FooterBar />
  </>
)

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query GetLandingPage {
        shop {
          shipsToCountries
        }
        collection(handle: "all") {
          products(first: 250, sortKey: MANUAL) {
            nodes {
              id
              title
              productType
              tags
              seo {
                description
              }
              priceRange {
                maxVariantPrice {
                  amount
                }
                minVariantPrice {
                  amount
                }
              }
              featuredImage {
                url
              }
            }
          }
        }
      }
    `,
  })

  const { shipsToCountries } = data.shop

  const products = data.collection.products.nodes

  return {
    props: {
      shop: {
        shipsToCountries,
      },
      // eslint-disable-next-line
      // @ts-expect-error
      products: products.map(p => ({
        id: getGid(p.id),
        title: p.title,
        description: p.seo.description,
        productType: p.productType,
        tags: p.tags,
        price: {
          max: getPrice(p.priceRange.maxVariantPrice.amount),
          min: getPrice(p.priceRange.minVariantPrice.amount),
        },
        featuredImage: {
          url: p.featuredImage.url,
        },
      })),
    },
  }
}

export default Home
