loadsh.prototype.get = function (obj, path, defaultValue) {
  return path.reduce((cur, next) => {
    return obj[cur] ? obj[next] : defaultValue
  })
}