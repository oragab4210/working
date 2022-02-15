import React from "react";
import { render } from "react-dom";
import "./index.css";
/* -------------------------------------------------------------------------- */
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
/* -------------------------------------------------------------------------- */
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import CurrentUser from "./GQL/queries/CurrentUser";
import setUser from "./GQL/queries/setUser";
require("dotenv").config();
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
const cache = new InMemoryCache();
const init = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
  });
};

/* -------------------------------cors setup FOR LOCAL------------------------------------------- */
// const httpLink = new HttpLink({http://localhost:80/graphql})

// const client = new ApolloClient({
//   link:new HttpLink({ `http://localhost:80/graphql`}),
//   cache: cache,
//   // credentials: "include",
// });

const link = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: cache,
  link,
});

//hi

/* ------------------------------- cors setup FOR EC2 ------------------------------- */
// const httpLink = new HttpLink({
//   uri: `http://localhost:${
//     process.env.REACT_APP_GRAPHQL_PORT
//       ? process.env.REACT_APP_GRAPHQL_PORT
//       : 4000
//   }/graphql`,
// });
// const client = new ApolloClient({
//   link: new HttpLink({
//     link: httpLink,
//   }),
//   cache: cache,
//   connectToDevTools: true,
// });

try {
  cache.readQuery({
    query: setUser,
  });
} catch (error) {
  cache.writeData({
    data: {
      user: [],
    },
  });
}
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:4000/graphql",
//     credentials: "include",
//   }),
//   cache: new InMemoryCache(),
//   connectToDevTools: true,
// });
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
init();
