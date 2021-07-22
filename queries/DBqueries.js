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
  query GetMealPlanFromDb($userId: ID!) {
    getMealPlanFromDb(userId: $userId) {
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

/* export const GENERATE_MEAL_PLAN = gql`
  mutation generateMealPlan(
    $userId: String!
    $addDays: Boolean
    $ignoreLock: Boolean
    $kcalLimit: Float
    $breakfastDistribution: Float
    $lunchDistribution: Float
    $dinnerDistribution: Float
    $snackDistribution: Float
  ) {
    generateMealPlan(
      userId: $userId
      addDays: $addDays
      ignoreLock: $ignoreLock
      kcalLimit: $kcalLimit
      breakfastDistribution: $breakfastDistribution
      lunchDistribution: $lunchDistribution
      dinnerDistribution: $dinnerDistribution
      snackDistribution: $snackDistribution
    ) {
      success
      message
    }
  }
`; */

export const GENERATE_MEAL_PLAN = gql`
  mutation generateMealPlan(
    $userId: ID!
    $addDays: Boolean
    $ignoreLock: Boolean
    $kcalLimit: Float
    $maxNumOfServings: Int
    $breakfastDistribution: Float
    $lunchDistribution: Float
    $dinnerDistribution: Float
    $snackDistribution: Float
  ) {
    generateMealPlan(
      userId: $userId
      addDays: $addDays
      ignoreLock: $ignoreLock
      kcalLimit: $kcalLimit
      maxNumOfServings: $maxNumOfServings
      breakfastDistribution: $breakfastDistribution
      lunchDistribution: $lunchDistribution
      dinnerDistribution: $dinnerDistribution
      snackDistribution: $snackDistribution
    ) {
      success
      message
    }
  }
`;
