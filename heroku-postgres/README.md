# Heroku + Postgres

This example demonstrates a simple collaborative realtime pixel-editor deploying a ripple app on heroku and using a postgres database for persistence.

# Run

```
git init
heroku create --http-git
heroku addons:add heroku-postgresql:hobby-dev
echo 'create table squares (id serial, square int, value boolean);' | heroku pg:psql 
git add .
git commit -m 'ripple'
git push heroku master
heroku ps:scale web=1
heroku open
```