export const AuthCookieNameProduction = '__Secure-jwt';
export const AuthCookieNameDevelopment = 'jwt';

export const getAuthCookieName = (isProduction: boolean) => {
  return isProduction ? AuthCookieNameProduction : AuthCookieNameDevelopment;
};
