# ShopForHome
Welcome to our E-Commerce Application **ShopForHome**.

This application is a full-featured online shopping website that allows users to browse and purchase products.

## Features
- User registration and login
- Product browsing and searching
- Product reviews and ratings
- Shopping cart and checkout
- Order history and tracking
- Admin panel for managing products and orders

## Technology Stack
- MongoDB: NoSQL database for storing products and user data in a JSON-like format.
- Express.js: Web framework for Node.js that is used to create the backend of the application. It provides a set of routing and middleware functions that are used to handle HTTP requests and responses.
- React: JavaScript library for building user interfaces and allows for the creation of reusable UI components.
- Node.js: JavaScript runtime environment that allows for the execution of JavaScript code on the server-side. It is used to run the backend of the application.


## Getting Started

### STEP-1 Install Dependencies (Separate terminal) ##
- For Backend -> First cd backend and than run "npm i".
- For Frontend - cd frontend "npm i".

### STEP-2 (Both are in separate terminal)

- To Run The Backend Server Run "npm run dev".
- To Run The Frontend Run Command "npm start".

### .env variables
- Make Sure to Create a config.env file in backend/config directory and add appropriate variables in order to use the app.
- We are providing our env variables on which we are running our project so if you want to use yours than just update "MONGO_URI" according to your system and remaining variables keep as it is. 
- if you want to use your own env variables than create config.env file in config folder (backend) and than run the project.

### Essential Variables (fill each field with your info)

    - PORT=4000
    - MONGO_URI= 
    - FRONTEND_URl=http://localhost:3000
    - JWT_SECRET=ujjawalrawat
    - JWT_EXPIRE=5d
    - COOKIE_EXPIRE=5
    - SMPT_SERVICE= gmail
    - SMPT_MAIL= group7greatlearning@gmail.com
    - SMPT_PASSWORD= xmnujjodnfqjlpju
    - SMPT_HOST=smtp.gmail.com
    - SMPT_PORT=465
    - CLOUDINARY_NAME=ujjawal2000
    - CLOUDINARY_API_KEY=797483554858359
    - CLOUDINARY_API_SECRET=wqO7u6OHx-h8J1HuvaKUo_VdfF8
    - STRIPE_API_KEY=pk_test_51LHMBOSEX9ppej214L38YqXcLsU3GjnJkPR6aG2Uj6zwGXltI7bt1G8kBeOCXxpSxlJm0HkSs5UKHlEjZmrNikzs00cVSw9vTH
    - STRIPE_SECRET_KEY=sk_test_51LHMBOSEX9ppej21ayJa7GuXQ3MmG210CKLXQP78Ge9jhJ7WrSp7ExqnELSwkgK232n97AcIVEez04cBh5wX5L5D00iXFmMIhk
    - NODE_ENV=DEVELOPEMENT
    
    -- Admin can also act as user after login.

### After successfully running the project in browser. 

#### To create a Admin first go to register page -
    1. Register a user .
    2. Then go to mongoDb in project database to the user section where user are register.
    3. Then make the register user role to the "Admin". 
    4. And update the database now go to project.
    5. login with the same user details now this user has full control as a admin.

    - Now Admin have CRUD operation for the user and products including bulk upload and coupons as well as stock, sales report and reviews.

#### To create, delete or update any product follow below steps -
- Go to admin dashboard than click on the product there will be three options -
    - ALL- this is for to get all the products here you can edit and delete the product.
    - CREATE- this is for creating a new product.
    - BULK UPLOAD- this is for the product bulk uploadtion.

#### To create, delete or update any coupon follow below steps -
- Go to admin dashboard than click on the coupons there will be two option .
    - ALL- this is for to get all the coupons here you can edit and delete the coupons.
    - CREATE- this is for creating a new coupons.
    - (these coupons will be applicable for the users at the time of payment)

#### To update the status of any orders follow below steps -

- Click on any order for which you want to update a status, then click on edit icon (pencil) and update the status from processing to shipped or delivered as you want.

#### To delete or update any users follow below steps -

- Go to admin dashboard than click on the users.
    - here you will get all the users,
    - now you can edit and delete the users.
   
#### To see the reviews of a particular product -
- copy the id from the product section and search in reviews section.


#### Now simply create another user to visit the website as a user
- just login with user details and go to product page.
- now user can add the product to the cart and wishlist and make a purchase.
- (admin can also act like a user)

## Contributing
We welcome contributions to this project. If you would like to submit a pull request, please make sure to follow our coding standards and guidelines.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
If you have any questions or issues, please feel free to open a issue on GitHub.
