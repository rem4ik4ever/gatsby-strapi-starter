const path = require("path")

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (!result.success) {
          reject(result.errors)
        }

        return result
      })
    )
  })

const makeArticles = (createPage, graphql) => {
  return makeRequest(
    graphql,
    `{
      allStrapiArticle{
        edges {
          node {
            id
          }
        }
      }
    }
  `
  ).then(result => {
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  })
}

const makeAuthors = (createPage, graphql) => {
  return makeRequest(
    graphql,
    `{
      allStrapiUser{
        edges {
          node {
            id
          }
        }
      }
    }
  `
  ).then(result => {
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/author.js`),
        context: {
          id: node.id,
        },
      })
    })
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const articles = makeArticles(createPage, graphql)
  const authors = makeAuthors(createPage, graphql)

  return Promise.all([articles, authors])
}
