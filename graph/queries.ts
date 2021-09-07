import { gql } from "@apollo/client";

export const FETCH_FEED = gql`
  query Feed {
    feed(take: 100, skip: 0) {
      count
      links {
        id
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
            name
          }
        }
      }
    }
  }
`;
