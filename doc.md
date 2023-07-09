# What the project is

You can manage products by the product-api linked to the auth-api

You can manage orders by the payment-api linked to the auth-api and the product-api (to check stocks)

This project uses docker and GRPC interoperability between the services

# How to install
See the [readme.md](readme.md) for instructions on how to install the project.

# Product api
- Add product

Need to be logged in (bearer token)
![img.png](readme-images/add_product.png)
- Get product
![img.png](readme-images/get_product.png)

- Update product

Need to be logged in (bearer token)
![img.png](readme-images/update_product.png)

- Delete product

Need to be logged in (bearer token)
![img.png](readme-images/delete_product.png)


# Payment api
- Create order

Need to be logged in (bearer token)
![img.png](readme-images/create_order.png)
- Get order

Need to be logged in (bearer token) and be the owner of the order
![img.png](readme-images/get_order.png)
- Update order

Need to be logged in (bearer token) and be the owner of the order
![img.png](readme-images/update_order.png)
- Delete order

Need to be logged in (bearer token) and be the owner of the order
![img.png](readme-images/delete_order.png)