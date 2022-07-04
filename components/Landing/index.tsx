import { PropsWithChildren } from 'react'

import Hero from './Hero'

const Layout = ({ children }: PropsWithChildren) => (
  <main>
    <Hero />
    {children}
  </main>
)

export default Layout
