import { Helmet } from 'react-helmet-async'

const SEO = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default SEO
