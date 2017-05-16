export MONGO_URL=mongodb://localhost/www
export MONGO_OPLOG_URL=mongodb://localhost/local
meteor --port 5000 --settings settings.json $@
