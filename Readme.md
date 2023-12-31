This is a school projet. To see what was developped, please see the [doc.md](doc.md) file.


# gRPC Task Manager

## Installation

### Create the docker network

```bash
docker network create grpc-microservice-project
```

### if docker network doesn't work WARNING

```bash
docker network prune
```

### Launch the databases and tracing tools

```bash
docker compose up -d mariadb mongo tracing
```

### Set environment variables
#### User-api

Set the .env :
```bash
MYSQL_URL="mysql://root:passwd@localhost:3306/user"
insecure=true
NODE_ENV=development
JAEGER_URL="http://localhost:4318/v1/traces"
HEALTH_PORT=3001
AUTH_API_URL="localhost:4003"
```

#### Auth-api

Set the .env :
```bash
MYSQL_URL="mysql://root:passwd@localhost:3306/auth"
PORT=4003
USER_API_URL="localhost:4002"
JWT_SECRET="super-secret"
insecure=true
JAEGER_URL="http://localhost:4318/v1/traces"
HEALTH_PORT=3002
```

#### Product-api

Set the .env :
```bash
DATABASE_URL="mysql://root:passwd@localhost:3306/product"
```

#### Payment-api

Set the .env :
```bash
DATABASE_URL="mysql://root:passwd@localhost:3306/payment"
```

### Run the prisma migration
From root folder, execute
```bash
sh migrateAll.sh
```

Tips: to create proto files, you have to create them in /proto folder from the root, and execute this command to update them (and create stubs) in /proto
```bash
sh export.sh
```

## SSL

### Install mkcert 

https://github.com/FiloSottile/mkcert

### Certificates and rootCA

```bash
mkcert user-api localhost
mkcert auth-api localhost
mkcert front localhost
cp $(mkcert -CAROOT)/rootCA.pem .
```

Remove the +1 part of the name of the certificates 

## Start the servers

```bash
docker compose up -d
```

| **Name**         | **Url**                |
|------------------|------------------------|
| observability ui | http://localhost:16686 |
