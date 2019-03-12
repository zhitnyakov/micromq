const Gateway = require('../gateway');

const app = new Gateway({
  requests: {
    timeout: 3000,
  },
  microservices: ['users', 'balances'],
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

app.action('authorize', (meta) => {
  if (meta.userId !== 1) {
    return [400, { error: 'Access denied' }];
  }

  return { isAuthorized: true };
});

app.all('/users/(.*)', async (req, res) => {
  await res.delegate('users');
});

app.listen(process.env.PORT);
