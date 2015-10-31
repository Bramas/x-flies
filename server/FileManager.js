var fs = Npm.require('fs');
var path = Npm.require('path');

FileManager = {};

FileManager.getStats = function (p) {
  var stats = fs.statSync(p);
  return {
    folder: stats.isDirectory(),
    size: stats.size,
    mtime: stats.mtime.getTime()
  }
};

FileManager.list = function (dirPath, fakePath) {
  var files = fs.readdirSync(dirPath);
  var stats = [];
  for (var i=0; i<files.length; ++i) {
    var fPath = path.join(dirPath, files[i]);
    var fakeFilePath = path.join(fakePath, files[i]);
    var stat = FileManager.getStats(fPath);
    stat.fileName = files[i];
    stat.filePath = fakeFilePath;
    stats.push(stat);
  }
  return stats;
};

FileManager.remove = function (p) {
  fse.remove(p);
};

FileManager.mkdirs = function (dirPath) {
  fse.mkdirs(dirPath);
};

FileManager.move = function (srcs, dest) {
  for (var i=0; i<srcs.length; ++i) {
    var basename = path.basename(srcs[i]);
    fse.move(srcs[i], path.join(dest, basename));
  }
};

FileManager.rename = function (src, dest) {
  fse.move(src, dest);
};
console.log('test');

//Meteor.FileManager = FileManager;