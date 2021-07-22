import { gql } from '@apollo/client';
export const GET_ALL_USERS = gql`
  query {
    getAllDbUsers {
      name
      password
    }
  }
`;

export const GET_MEALPLAN_FROM_DB = gql`
  query {
    getMealPlanFromDb(userId: "0aa04c61-b2c1-49eb-9426-aa89d6174008") {
      id
      mealPlan {
        day
        date
        calories
        meals {
          calories
          meal
          recipe {
            name
          }
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      success
      message
      user {
        databaseId
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  query LoginUserByEmail($email: String!, $password: String!) {
    LoginUserByEmail(email: $email, password: $password) {
      success
      message
      user {
        databaseId
        name
      }
    }
  }
`;
