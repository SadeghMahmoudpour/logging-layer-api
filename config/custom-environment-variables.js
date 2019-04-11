module.exports = {

  auth: {
    secret: 'AUTH_SECRET',
    client: {
      client_secret: 'AUTH_CLIENT_SECRET'
    },
    oauth: {
      aut: {
        url: 'AUTH_OAUTH_AUT_URL',
        client_id: 'AUTH_OAUTH_AUT_CLIENT_ID',
        redirect_uri: 'AUTH_OAUTH_AUT_REDIRECT_URI',
        client_secret: 'AUTH_OAUTH_AUT_CLIENT_SECRET'
      }
    }
  },

  minio: {
    endPoint: 'MINIO_ENDPOINT',
    port: 'MINIO_PORT',
    secure: 'MINIO_SECURE',
    accessKey: 'MINIO_ACCESS_KEY',
    secretKey: 'MINIO_SECRET_KEY',
    public_url: 'MINIO_PUBLIC_URL'
  },

  camunda: {
    url: 'CAMUNDA_URL'
  },

  mongo: {
    connections: {
      default: { uri: 'MONGO_CONNECTIONS_DEFAULT' }
    }
  },

  mail: {
    enabled: 'MAIL_ENABLED',
    transport: {
      host: 'MAIL_HOST',
      auth: {
        user: 'MAIL_USER',
        pass: 'MAIL_PASS'
      }
    }
  },

  log: {
    sentry: {
      dsn: 'SENTRY_DSN'
    }
  }

}
