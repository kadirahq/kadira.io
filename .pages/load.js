var path = require('path');
var fs = require('fs');
var baseDir = process.env['BASE_DIR'] || './';
var contentDirs = ['platform', 'meteor-routing-guide', 'meteor-performance-101'];
var mongoUrl = process.env.KADIRA_IO_MONGO_URL || 'mongodb://localhost/www';
var mongo = require('mongodb').MongoClient;
var crypto = require('crypto');
var async = require('async');
var pages = [];

console.log('start processing');
contentDirs.forEach(function(dir, lc) {
  var fullContentPath = path.resolve(baseDir, dir);
  var categories = [dir];
  var indexes = [lc];
  pages = pages.concat(getContent(fullContentPath, categories, indexes));
});

console.log('processing completed');
console.log('\nsubmitting to db');

function getContent(contentPath, categories, indexes, names) {
  var contentGroups = fs.readdirSync(contentPath)
    .map(function(file) {
      var parts = file.replace('.md', '').split('-');
      var canonicalPath = path.resolve(contentPath, file);
      var info = {
        canonicalPath: canonicalPath,
        isDir: fs.statSync(canonicalPath).isDirectory(),
        index: parseInt(parts.shift()),
        slug: parts.join('-'),
        categoryName: parts.join('-')
      };

      return info;
    });

  var pages = [];
  contentGroups.forEach(function(info, lc) {
    var newCategories = clone(categories);
    newCategories.push(info.categoryName);

    var newIndexes = clone(indexes);
    newIndexes.push(info.index);

    if(info.isDir) {
      pages = pages.concat(getContent(info.canonicalPath, newCategories, newIndexes));
    } else {
      var content = parseRawContent(info.canonicalPath);
      content._id = buildId(newCategories);
      content.categories = categories;
      content.index = info.index;
      content.indexes = newIndexes;
      content.slug = info.slug;
      pages.push(content);
    }
  });

  return pages;
}

mongo.connect(mongoUrl, function(err, db) {
  if(err) {
    throw err;
  }

  var pagesCollection = db.collection('pages');
  async.map(
    pages,
    function(page, done) {
      pagesCollection.save(page, done);
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

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

function buildId(categories) {
  var payload = JSON.stringify(categories);
  var id = crypto.createHash('md5').update(payload).digest('hex');
  return id;
}

function parseRawContent(filename) {
  if(!fs.existsSync(filename)) {
    return null;
  }

  var rawContent = fs.readFileSync(filename, 'utf8');
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
