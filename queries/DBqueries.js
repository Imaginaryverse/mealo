import { gql } from '@apollo/client';

export const GET_RECIPE_FROM_DB = gql`
  query GetRecipeFromDb($id: ID!) {
    getRecipeFromDb(id: $id) {
      id
      databaseId
      name
      numberOfServings
      ingredientsCount
      ingredientLines
      courses
      cuisines
      mealTags
      source {
        recipeUrl
      }
      mainImage
      instructions
      totalTime
      nutrientsPerServing {
        calories
        sugar
        fiber
        protein
        carbs
        fat
      }
      caloriesPerServing {
        protein
        carbs
        fat
      }
    }
  }
`;

export const GET_RECIPES_BY_IDS = gql`
  query GetRecipesByIds($ids: [ID!]!) {
    getRecipesByIds(ids: $ids) {
      id
      databaseId
      name
      numberOfServings
      ingredientsCount
      ingredientLines
      courses
      cuisines
      mealTags
      source {
        recipeUrl
      }
      mainImage
      instructions
      totalTime
      nutrientsPerServing {
        calories
        sugar
        fiber
        protein
        carbs
        fat
      }
      caloriesPerServing {
        protein
        carbs
        fat
      }
    }
  }
`;

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
          numOfServings
          recipe {
            id
            databaseId
            name
            numberOfServings
            ingredientsCount
            ingredientLines
            courses
            cuisines
            mealTags
            source {
              recipeUrl
            }
            mainImage
            instructions
            totalTime
            nutrientsPerServing {
              calories
              sugar
              fiber
              protein
              carbs
              fat
            }
            caloriesPerServing {
              protein
              carbs
              fat
            }
          }
        }
      }
    }
  }
`;

export const RECIPE_SWAP_OPTIONS = gql`
  query RecipeSwapOptions($userId: ID!, $recipeId: ID!) {
    recipeSwapOptions(userId: $userId, recipeId: $recipeId) {
      id
      databaseId
      name
      numberOfServings
      ingredientsCount
      ingredientLines
      courses
      cuisines
      mealTags
      source {
        recipeUrl
      }
      mainImage
      instructions
      totalTime
      nutrientsPerServing {
        calories
        sugar
        fiber
        protein
        carbs
        fat
      }
      caloriesPerServing {
        protein
        carbs
        fat
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
        email
        favoriteRecipes
        restrictions
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

export const SWAP_MEALPLAN_RECIPE = gql`
  mutation SwapMealPlanRecipe($recipeId: ID!, $mealId: ID!, $userId: ID!) {
    swapMealPlanRecipe(recipeId: $recipeId, mealId: $mealId, userId: $userId) {
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
            id
            databaseId
            name
            numberOfServings
            ingredientsCount
            ingredientLines
            courses
            cuisines
            mealTags
            source {
              recipeUrl
            }
            mainImage
            instructions
            totalTime
            nutrientsPerServing {
              calories
              sugar
              fiber
              protein
              carbs
              fat
            }
            caloriesPerServing {
              protein
              carbs
              fat
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_RESTRICTIONS = gql`
  query {
    getAllRestrictions {
      id
      name
      subcategory
      slugname
    }
  }
`;

export const PROFILE_RESTRICTIONS_UPDATE = gql`
  mutation ProfileRestrictionsUpdate($userId: ID!, $restrictions: [String]!) {
    profileRestrictionsUpdate(userId: $userId, restrictions: $restrictions) {
      success
    }
  }
`;

export const ADD_RECIPE_TO_FAVORITES = gql`
  mutation AddRecipeToFavorites($recipeId: ID!, $userId: ID!) {
    addRecipeToFavorites(recipeId: $recipeId, userId: $userId) {
      success
      message
    }
  }
`;

export const REMOVE_RECIPE_FROM_FAVORITES = gql`
  mutation RemoveRecipeFromFavorites($recipeId: ID!, $userId: ID!) {
    removeRecipeFromFavorites(recipeId: $recipeId, userId: $userId) {
      success
      message
    }
  }
`;
