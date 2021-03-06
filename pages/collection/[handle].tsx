import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { gql } from '@apollo/client'

import FooterBar from '../../components/FooterBar'
import HeaderBar from '../../components/HeaderBar'

import client from '../../utils/apollo-client'

import type { NextPage } from 'next'
import { getGid } from '../../utils/getGid'
import { getTitle } from '../../utils/getTitle'
import ProductListing from '../../components/ProductListing'

interface CollectionProps {
  shop: {
    description: string
  }
  title: string
  products: Product[]
}

const Collection: NextPage<CollectionProps> = ({ shop, title, products }) => (
  <>
    <Head>
      <title>{getTitle(title)}</title>
      <meta name="description" content={shop.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeaderBar />
    <section className="flex flex-col justify-center items-center">
      <h2 className="text-3xl py-6">{title}</h2>
      <ul className="productList">
        {products.map(product => (
          <li key={product.id}>
            <ProductListing product={product} />
          </li>
        ))}
      </ul>
    </section>
    <FooterBar />
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const _handle = params?.handle as string

  if (!_handle) {
    return {
      notFound: true,
    }
  }

  const { data } = await client.query({
    query: gql`
      query GetCollection {
        shop {
          description
        }
        collection(handle: "${_handle}") {
          title
          description
          products(first: 250) {
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
              images(first: 5) {
                nodes {
                  id
                  altText
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
    `,
  })

  const { description } = data.shop
  const products = data.collection.products.nodes

  return {
    props: {
      shop: {
        description,
      },
      title: data.collection.title,
      description: data.collection.description,
      // eslint-disable-next-line
      // @ts-expect-error
      products: products.map(p => ({
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
        // eslint-disable-next-line
        // @ts-expect-error
        images: p.images.nodes.map(img => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          width: img.width,
          height: img.height,
        })),
      })),
    },
  }
}

export default Collection
