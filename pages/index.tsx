import Head from 'next/head'

import { gql } from '@apollo/client'

import HeaderBar from '../components/HeaderBar'
import Landing from '../components/Landing'
import client from '../utils/apollo-client'

import type { NextPage } from 'next'
import FooterBar from '../components/FooterBar'
import { useMediaQuery } from 'usehooks-ts'
import { config } from '../utils/config'
interface HomeProps {
  shop: {
    name: string
    description: string
    shipsToCountries: string[]
  }
}

const Home: NextPage<HomeProps> = ({ shop }) => {
  const mobile = useMediaQuery(config.breakpoint.sm)

  return (
    <>
      <Head>
        <title>{shop.name}</title>
        <meta name="description" content={shop.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar large={!mobile} />
      <Landing />
      <div className="h-32" />
      <FooterBar />
    </>
  )
}

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

  return {
    props: {
      shop: {
        name,
        shipsToCountries,
      },
    },
  }
}

export default Home
