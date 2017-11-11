// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  userLogin: 'https://cryptocurrency-tracker-backend.herokuapp.com/auth/login',
  userSignup: 'https://cryptocurrency-tracker-backend.herokuapp.com/users/signup',
  userProfile: 'https://cryptocurrency-tracker-backend.herokuapp.com/users/profile',
  userLogout: 'https://cryptocurrency-tracker-backend.herokuapp.com/auth/logout',
  userDelete: 'https://cryptocurrency-tracker-backend.herokuapp.com/users',
  userBalance: 'https://cryptocurrency-tracker-backend.herokuapp.com/users/balance',
  cryptoSearch: 'https://cryptocurrency-tracker-backend.herokuapp.com/currency',
  portfolio: 'https://cryptocurrency-tracker-backend.herokuapp.com/currency/portfolio',
  transaction: 'https://cryptocurrency-tracker-backend.herokuapp.com/transactions',
  tracking: 'https://cryptocurrency-tracker-backend.herokuapp.com/currency/tracking',
  cryptocurrency: 'https://cryptocurrency-tracker-backend.herokuapp.com/currency',
  oneCryptoPt1: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=',
  oneCryptoPt2: '&tsyms=USD'
};
