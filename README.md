# install

```bash
npm ci
```

# environment file

postgresql(neon)

**.env**
```
DATABASE_URL=postgresql://*****/:*****@********.ap-southeast-1.aws.neon.tech/******?sslmode=require
```

# start up(dev)

```bash
npm run dev
```

# start up(production)

```bash
npm run build
npm run start
```

# docker start up 

```bash
# start up
docker build ./ -t nextjs
docker run -e DATABASE_URL=postgresql://*****/:*****@********.ap-southeast-1.aws.neon.tech/******?sslmode=require -p 8080:8080 nextjs
# shout down
docker container stop {container}
```