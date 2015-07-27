# Heroku + Postgres

This example demonstrates a simple collaborative realtime pixel-editor deploying a ripple app on heroku and using a postgres database for persistence.

![image](https://cloud.githubusercontent.com/assets/2184177/5291842/64475b6a-7b50-11e4-91f0-3eabf3f05922.png)

Running example: https://immense-scrubland-5550.herokuapp.com/ (try opening in two tabs side-by-side)

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

Or, locally:

```
node index.js
```
