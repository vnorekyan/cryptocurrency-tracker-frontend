// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  userLogin: 'http://localhost:3000/auth/login',
  userSignup: 'http://localhost:3000/users/signup',
  userProfile: 'http://localhost:3000/users/profile',
  userLogout: 'http://localhost:3000/auth/logout',
  userDelete: 'http://localhost:3000/users',
  userBalance: 'http://localhost:3000/users/balance',
  cryptoSearch: 'http://localhost:3000/currency',
  portfolio: 'http://localhost:3000/currency/portfolio',
  transaction: 'http://localhost:3000/transactions',
  tracking: 'http://localhost:3000/currency/tracking',
  cryptocurrency: 'http://localhost:3000/currency',
  oneCryptoPt1: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=',
  oneCryptoPt2: '&tsyms=USD'
};
