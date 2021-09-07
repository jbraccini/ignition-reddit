import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = process.browser
  ? new WebSocketLink({
      uri: "ws://api.vrmarketing.guru",
      options: {
        reconnect: true,
        connectionParams: {
          // authorization: localStorage.getItem("token"),
        },
      },
    })
  : null;

const httpLink = createHttpLink({
  uri: "http://api.vrmarketing.guru/",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: wsLink ? wsLink.concat(authLink.concat(httpLink)) : authLink.concat(httpLink),
  link: authLink.concat(httpLink),
});

export default client;
