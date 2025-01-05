#Production
git reset --hard
git checkout master
git pull origin master

npm install
pm2 start "process.config.js" --env production