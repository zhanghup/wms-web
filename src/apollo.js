import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import {ApolloLink} from 'apollo-link'
import tag from 'graphql-tag'
import { Message } from 'element-ui'




const middlewareLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('access_token')
  operation.setContext({
    headers: {
      Authorization: token
    }
  })
  return forward(operation)
})

const networkError = new onError(r => {
  if (r.networkError) {
    switch (r.networkError.statusCode) {
      case 401:location.href = '/login.html'; return
    }
  }
})

function Format(path) {
  let apiLink = new HttpLink({
    uri: process.env.BASE_URL + path // 请求路径
  })

  let obj = new ApolloClient({
    link: middlewareLink.concat(networkError.concat(apiLink)), // 如果不添加请求头直接放路径
    cache: new InMemoryCache({
      addTypename: false,
      resultCaching: false
    }),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only"
      }
    },
    connectToDevTools: true
  })

  obj.$query2 = (query, vars,complate) => {
    return new Promise((resolve, reject) => {
      obj
        .query({
          query: tag`${query}`,
          variables: { ...vars },
        }).then(r => {
          if(complate && complate instanceof Function){
            complate()
          }
          resolve(r.data)
        }).catch(r => {
          if(complate && complate instanceof Function){
            complate()
          }
            reject(r)
        })
    });
  };
  obj.$query = (query, vars,complate) => {
    return new Promise((resolve, reject) => {
      obj
        .query({
          query: tag`${query}`,
          variables: { query: vars },
        }).then(r => {
          if(complate && complate instanceof Function){
            complate()
          }
          resolve(r.data)
        }).catch(r => {
          if(complate && complate instanceof Function){
            complate()
          }
            reject(r)
        })
      })
  };
  obj.$mutate = (query, vars,complate) => {
    return new Promise((resolve, reject) => {
      obj
        .mutate({
          mutation: tag`${query}`,
          variables: vars,
        }).then(r => {
          if(complate && complate instanceof Function){
            complate()
          }
          resolve(r.data)
        }).catch(r => {
          if(complate && complate instanceof Function){
            complate()
          }
            reject(r)
        })
      })
  };
  return obj;
}


export const api = Format("/api")
export const auth = Format("/auth")
