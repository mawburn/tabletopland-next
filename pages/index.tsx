import Head from 'next/head'
import Image from 'next/image'

import { gql } from '@apollo/client'

import client from '../utils/apollo-client'

import type { NextPage } from 'next'
import { config } from '../utils/config'

interface HomeProps {
  shop: {
    name: string
    shipsToCountries: string[]
  }
}

const Home: NextPage<HomeProps> = ({ shop }) => {
  return (
    <div>
      <Head>
        <title>{shop.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to {shop.name}</h1>
        <Image
          src={`${config.cdn}/images/hero-desktop.webp`}
          width={1200}
          height={628}
          alt="hero"
        />
        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>
        <div>
          <a href="https://nextjs.org/docs">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples">
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        shop {
          name
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
