class DateService {
  static getDaysInMs(days: number) {
    return 1000 * 60 * 60 * 60 * 24 * days;
  }

  static getMinutesInMs(minutes: number) {
    return 1000 * 60 * minutes;
  }
}

export const ACCESS_TOKEN_OPTIONS = {
  httpOnly: true,
  maxAge: DateService.getMinutesInMs(15),
  path: '/api/orders',
};

export const REFRESH_TOKEN_OPTIONS = {
  httpOnly: true,
  maxAge: DateService.getDaysInMs(60),
  path: '/api/auth/refresh',
};
