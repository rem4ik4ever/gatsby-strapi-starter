import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiArticle.edges.map(article => (
        <li>
          <h2>
            <Link to={`/${article.node.id}`}>{article.node.title}</Link>
          </h2>
          <Img
            fixed={{
              src: `http://localhost:1337${article.node.image[0].url}`,
              width: 200,
              height: 125,
            }}
          />
          <p>{article.node.content}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
          image {
            url
          }
        }
      }
    }
  }
`
