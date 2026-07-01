# Ballcom project.

Run with 'docker compose up --build' and use the postman collection to create an order.
Information will be passed using the products from the product catalog and customers from the customer microservices.
The order information will be sent to the payment service and then to the warehouse where it can be packaged and then send to the shipping service which saves it in the database.
The customer support service can be the status of the order.
