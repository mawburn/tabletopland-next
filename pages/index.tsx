import Head from 'next/head'
import Cookies from 'cookies'

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

import { IncomingMessage, ServerResponse } from 'http'

interface HomeProps {
  shop: {
    shipsToCountries: string[]
  }
  checkoutUrl: string
  products: Product[]
}

const Home: NextPage<HomeProps> = ({ checkoutUrl, products }) => (
  <>
    <Head>
      <title>{getTitle()}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderBar checkoutUrl={checkoutUrl} />
    <main className="h-fit">
      <Collection products={products} />
    </main>
    <FooterBar />
  </>
)

export async function getServerSideProps({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse
}) {
  const cookies = new Cookies(req, res)
  let cartId = cookies.get('cartId')

  if (!cartId) {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateCart {
          cartCreate {
            cart {
              id
            }
          }
        }
      `,
    })

    cartId = data.cartCreate.cart.id
    cookies.set('cartId', cartId, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
  }

  const { data } = await client.query({
    query: gql`
      query GetLandingPage {
        shop {
          shipsToCountries
        }
        cart(id: "${cartId}") {
          checkoutUrl
          createdAt
          updatedAt
          totalQuantity
          cost {
            totalAmount {
              amount
            }
          }
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
      checkoutUrl: data.cart.checkoutUrl,
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
