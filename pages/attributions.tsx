import Head from 'next/head'

import { gql } from '@apollo/client'

import FooterBar from '../components/FooterBar'
import HeaderBar from '../components/HeaderBar'

import client from '../utils/apollo-client'

import type { NextPage } from 'next'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { getTitle } from '../utils/getTitle'

interface AttrProps {
  url: string
  name: string
  logo?: string
}

const Attribution = ({ url, name, logo, children }: PropsWithChildren<AttrProps>) => (
  <li className="card w-72 my-4 px-4 py-2">
    {logo && (
      <a className="flex justify-center align-center font-bold" href={url} rel="noopener">
        <Image src={logo} alt={name} width={75} height={75} loading="lazy" />
      </a>
    )}
    <h3 className="text-xl tracking-wider pb-2">
      <a className="font-bold" href={url} rel="noopener">
        {name}
      </a>
    </h3>
    <p className="text-sm">{children}</p>
  </li>
)

interface HomeProps {
  shop: {
    description: string
  }
}

const Attributions: NextPage<HomeProps> = ({ shop }) => (
  <>
    <Head>
      <title>{getTitle('Attributions')}</title>
      <meta name="description" content={shop.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderBar />
    <section className="mx-auto mt-8 mb-4">
      <h2 className="text-xl tracking-wider">A special thanks to the following</h2>
      <ul className="flex gap-3 flex-wrap">
        <Attribution
          name="Barthism Diorama"
          url="https://www.instagram.com/barthism_diorama/"
          logo="/img/attributes/barthism-diorama.webp"
        >
          For providing top quality pictures of our landing pages &amp; other promotional material.
        </Attribution>
        <Attribution
          name="Dave Thaumavore RPG Reviews"
          url="https://www.youtube.com/watch?v=V6HywdfDxBo"
          logo="/img/attributes/dave.webp"
        >
          For giving us a place to start sponsoring videos &amp; general support in the whole
          process.
        </Attribution>
      </ul>
    </section>
    <FooterBar />
  </>
)

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetLandingPage {
        shop {
          description
        }
      }
    `,
  })

  const { description } = data.shop

  return {
    props: {
      shop: {
        description,
      },
    },
  }
}

export default Attributions
