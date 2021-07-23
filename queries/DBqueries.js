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
          id
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

/* export const GET_MEALPLAN_FROM_DB = gql`
  query GetMealPlanFromDb($userId: ID!) {
    getMealPlanFromDb(userId: $userId) {
      id
      mealPlan {
        day
        date
        calories
        meals {
          id
          calories
          meal
          numOfServings
          recipe {
            databaseId
            totalTime
            name
            numberOfServings
            ingredientsCount
            ingredientLines
            courses
            cuisines
            mainImage
            source {
              siteUrl
              recipeUrl
            }
            instructions
            nutrientsPerServing {
              protein
              carbs
              fat
            }
          }
        }
      }
    }
  }
`; */

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
        email
        profile {
          birthdate
          biologicalSex
          height
          startingWeight
          targetWeight
          activityLevel
          weeklyWeightGoal
          goalsOn
          dcig
          cd
          bmr
          tdee
        }
      }
    }
  }
`;

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

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $userId: ID!
    $birthdate: Date
    $biologicalSex: BiologicalSex
    $height: Float
    $startingWeight: Float
    $targetWeight: Float
    $activityLevel: ActivityLevel
    $weeklyWeightGoal: WeeklyWeightGoal
    $goalsOn: Boolean
  ) {
    updateUserProfile(
      userId: $userId
      birthdate: $birthdate
      biologicalSex: $biologicalSex
      height: $height
      startingWeight: $startingWeight
      targetWeight: $targetWeight
      activityLevel: $activityLevel
      weeklyWeightGoal: $weeklyWeightGoal
      goalsOn: $goalsOn
    ) {
      success
      dcig
      cd
      tdee
      bmr
    }
  }
`;
