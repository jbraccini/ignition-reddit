import { gql } from "@apollo/client";

export const POST_LINK = gql`
  mutation Post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
    }
  }
`;

export const SIGNIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const LINK_UPVOTE = gql`
  mutation LinkUpdate($id: ID!) {
    vote(linkId: $id) {
      id
    }
  }
`;
