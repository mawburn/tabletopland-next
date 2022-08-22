import { config } from './config'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: `https://${config.shopify}/api/2022-07/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': config.token,
  },
  cache: new InMemoryCache(),
})

export default client
