
# Mini Insuretech API

This is a mini insuretech API. It allows one to buy a plan, fetch products with their associated category and price, fetch pending policies under a plan, activate pending policies and fetch activated policies under a plan

## :four_leaf_clover:  Set up

1.  Clone the repo using this link: [Github](https://github.com/Endowmissy/mini-insuretech-api.git)
2.  cd into the project and run `npm install` to install the modules.
3.  Create a .env file and add the necessary variables using the `.env.example` format as a guide.
4.  Provided a postgres server is running, create a database
5.  Run `npm run migration` and `npm run seed:db` to migrate and seed in data for both dbs.
6.  Run `npm run start:dev` to start the development server.
 
## :sunrise:  Technologies Used

1. Node.js
2. NestJs
3. TypeScript
4. PostgreSQL
5. Sequelize-Typescript
6. Git


API Documentation - [Postman](https://documenter.getpostman.com/view/8491094/2sB2cPiQce)

## :cherry_blossom:  Sample test format

<h4>1. To buy a plan :</h4>

  POST `localhost:8001/api/v1/plans/create-plan`

   ```
   {
    "user_id": "7b169f98-f0b7-4a09-b0da-edc6ee073acd",
    "amount": 30000,
    "product_id": "bb3e134a-d720-4ac6-b352-79ccf2c038e7",
    "no_of_products": 2
}
   ```

<h4>2. To view the welcome page </h4>
   
  GET `localhost:8001/api/v1/`  
  
## Author:
Ayomikun Emmanuel  
