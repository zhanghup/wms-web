import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import {ApolloLink} from 'apollo-link'
import Tag from 'graphql-tag'

const apiLink = new HttpLink({
  uri: process.env.BASE_URL + '/base' // 请求路径
})
const authLink = new HttpLink({
  uri: process.env.BASE_URL + '/auth'// 请求路径
})

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('access_token')
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}` || null
    }
  })
  return forward(operation)
})

const baseClient = new ApolloClient({
  link: middlewareLink.concat(apiLink), // 如果不添加请求头直接放路径
  cache: new InMemoryCache()
})

const authClient = new ApolloClient({
  link: middlewareLink.concat(authLink), // 如果不添加请求头直接放路径
  cache: new InMemoryCache()
})

const apollo = new VueApollo({
  clients: {
    base: baseClient, // 不需要添加请求头
    auth: authClient // 不需要添加请求头
  }
})

const $query = (query, variables, ty = 'base') => {
  return new Promise((resolve, reject) => {
    apollo.clients[ty].query({
      query: Tag`${query}`,
      variables: {
        query: variables
      }
    }).then(r => {
      resolve(r.data)
    }).catch(r => {
      reject(r)
    })
  })
}

const $mutate = (query, variables, ty = 'base') => {
  return new Promise((resolve, reject) => {
    apollo.clients[ty].mutate({
      mutation: Tag`${query}`,
      variables
    }).then(r => {
      resolve(r.data)
    }).catch(r => {
      console.error(r)
      reject(r)
    })
  })
}

export const http = {
  $query,
  $mutate
}

export default apollo
