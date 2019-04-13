module.exports = [
  {
    prefix: '/',
    routes: [
      './api/test.get.js',
    ]
  },
  {
    prefix: '/admin',
    routes: [
      './api/admin/token.post.js',
      './api/admin/token.get.js',
      './api/admin/token.deactive.js',
      './api/admin/token.active.js',
      './api/admin/token.delete.js',
    ]
  },
  {
    prefix: '/log',
    routes: [
      './api/log/log.post.js',
      './api/log/index.js',
      './api/log/log.get.js',
      './api/log/timeSerie.get.js',
    ]
  },
  {
    prefix: '/file',
    routes: [
      './api/file/list.get.js',
      './api/file/list.delete.js',
    ]
  }
]
