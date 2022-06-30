import Head from 'next/head'

import { gql } from '@apollo/client'

import HeaderBar from '../components/HeaderBar'
import Landing from '../components/Landing'
import client from '../utils/apollo-client'

import type { NextPage } from 'next'
interface HomeProps {
  shop: {
    name: string
    description: string
    shipsToCountries: string[]
  }
}

const Home: NextPage<HomeProps> = ({ shop }) => {
  return (
    <div>
      <Head>
        <title>{shop.name}</title>
        <meta name="description" content={shop.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar large />
      <Landing />
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        shop {
          name
          description
          shipsToCountries
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
