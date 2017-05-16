var path = require('path');
var fs = require('fs');
var baseDir = process.env['BASE_DIR'] || './';
var contentDirs = ['other', 'blog'];
var mongoUrl = process.env.KADIRA_IO_MONGO_URL || 'mongodb://localhost/www';
var mongo = require('mongodb').MongoClient;
var crypto = require('crypto');
var async = require('async');
var pages = [];

console.log('start processing');
contentDirs.forEach(function(dir) {
  pages[dir] = [];
  var pathToScan = path.resolve(baseDir, dir);
  var files = fs.readdirSync(pathToScan);
  files.forEach(function(file) {
    var fullFilePath = path.resolve(pathToScan, file);
    console.log(' processing:', fullFilePath);
    var rawContent = fs.readFileSync(fullFilePath, 'utf8');
    var page = parseRawContent(rawContent);
    var hash = crypto.createHash('md5').update(dir + file).digest('hex');
    page._id = hash;
    page.date = parseDateFromFilename(file);
    page.slug = parsedSlugFromFilename(file);
    pages.push(page);
  });
});
console.log('processing completed');
console.log('\nsubmitting to db');

mongo.connect(mongoUrl, function(err, db) {
  if(err) {
    throw err;
  }

  var postsCollection = db.collection('posts');
  async.map(
    pages, 
    function(page, done) {
      postsCollection.save(page, done);
    },
    function(err) {
      if(err) {
        throw err;
      }

      console.log('submitting completed');
      process.exit(0);
    }
  );
});

function parseRawContent(rawContent) {
  var parsedContent = {};
  var parsed = rawContent.split('---').filter(function(c) {
    return !!c;
  }).map(function(c) {
    return c.trim();
  });

  parsed[0].split('\n').forEach(function(c) {
    var parts = c.split(':').map(function(p) {
      return p.trim();
    });
    var partOne = parts[0];
    var partTwo = c.substring(partOne.length + 1).trim();
    parsedContent[partOne] = partTwo;
  });

  parsedContent.content = parsed[1];
  return parsedContent;
}

function parseDateFromFilename(filename) {
  var dateString = filename.substring(0, 10);
  return new Date(dateString);
}

function parsedSlugFromFilename(filename) {
  var slug = path.basename(filename.substring(11), '.md');
  return slug;
}
