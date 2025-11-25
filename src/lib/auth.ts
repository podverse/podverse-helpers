export const AuthCookieNameProduction = '__Host-jwt';
export const AuthCookieNameDevelopment = 'jwt';

export const getAuthCookieName = (isProduction: boolean) => {
  return isProduction ? AuthCookieNameProduction : AuthCookieNameDevelopment;
};
