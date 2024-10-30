# Catalog App - React Native

## Objective

The goal of this assignment was to create a functional React Native app with key features including product listing, a cart system, filters, user location and offline data handling. I used React Native Expo to build this app.

## How to Run This App

##### 1. Install Expo CLI:

Run `npm install -g expo-cli` if you don't have Expo installed.

##### 2. Install Dependencies:

Inside the project folder, run `npm install` to install all necessary packages.

##### 3. Start the App:

Run `expo start`. This will open the Expo DevTools.

##### 4. Test on Your Device:

Use the **Expo Go** app on your phone (available on App Store or Google Play) to scan the** QR code** from the Expo DevTools.

## Approach and Thought Process

##### 1. State Management and Offline Data

Initially, I set up state management using useState and useEffect hooks along with AsyncStorage to handle offline data, aiming to ensure basic data persistence for users. However, as the project requirements evolved, I researched more robust options and discovered redux-persist, which is designed to work seamlessly with redux. After implementing redux-persist, I was able to manage data more effectively across sessions, which improved both code maintainability and user experience.

##### 2. Using Redux Toolkit with RTK Query

I used Redux Toolkit and RTK Query to manage API interactions and simplify state updates across the app. Redux Toolkit provided an organized structure, and RTK Query allowed me to fetch, cache, and sync data with minimal boilerplate code. This approach helped keep the app responsive and organized.

##### 3. Location Permissions

I used **expo-location** library to handle this securely and ensure a smooth experience for users.

##### 4. Type Safety with TypeScript

I implemented TypeScript throughout the codebase to reduce potential runtime errors and increase code reliability. TypeScript allowed me to define clear data structures for products, filters, and cart items, which streamlined development and made it easier to debug.

##### 5. Feature Development: Cart System, Product Filters, Product Details and Checkout

The product listing and filters were designed to be dynamic and responsive, allowing users to narrow down their choices based on various criteria. For the product details feature, I used a detailed screen view to display essential information and ensure users had an intuitive experience. I used a common cart buttons to handle adding and removing item from Product, Cart and Product Details screens seamlessly. Finally created a checkout screen where followed Foodpanda style just to show location that fetched in Home screen in here. And few more information about the order.

## Key Challenges and Solutions

##### Challenge 1: Handling Offline Data

The initial approach with AsyncStorage provided basic offline functionality, but it was difficult to scale. I later transitioned to redux-persist, which integrated seamlessly with Redux Toolkit. This shift improved data reliability across app restarts and provided a cleaner approach to offline persistence.

##### Challenge 2: State Consistency with Redux Toolkit and RTK Query

I was tried to configure how to manipulate a state's slice when query is fullfilled. Then found redux thunk is the reliable choice as I couldn't find a good solution in that time.
