// ** Api Endpoints
// const domain = "localhost"
// const domain = "192.168.1.4"

//http://192.168.1.15:8000/api/
const domain = '192.168.1.15:8000';
// const domain = "ok-go.in"
export default {
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access_token',
  storageRefreshTokenKeyName: 'access_token',

  // base api urls
  baseUrl: `http://${domain}/api/`,
  //   socketChatUrl: `ws://${domain}:8081`,
  //   socketNotificationUrl: domain,
  //   socketNotificationPort: 6001,

  imgUrl: `http://${domain}/`,

  // Api Endpoints

  //   loginEndpoint: '/jwt/login',
  //   registerEndpoint: '/jwt/register',
  //   refreshEndpoint: '/jwt/refresh-token',
  //   logoutEndpoint: '/jwt/logout',

  enableSocket: false,
  stampEnabled: true,
  entryPoint: 'MobileApp',
  //   enableSocket: false,
  //   stampEnabled: true,

  entryPoint: 'MobileApp',
};
