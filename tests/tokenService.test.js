/* eslint-disable no-undef */
// Generate test case for tokenService.js

import * as tokenService from '../src/services/tokenService.js';

describe('Token Service', () => {
  it('should generate a token', () => {
    const user = { id: 1, name: 'John Doe', role: { name: 'user' } };
    const token = tokenService.generateAccessToken(user);
    expect(token).toBeDefined();
  });

  it('should verify a token', () => {
    const user = { id: 1, name: 'John Doe', role: { name: 'user' } };
    const token = tokenService.generateAccessToken(user);
    const decoded = tokenService.verifyAccessToken(token);
    expect(decoded).toMatchObject({ userId: user.id, role: user.role?.name });
  });

  it('should return null for an invalid token', () => {
    const invalidToken = 'invalid.token.here';
    const decoded = tokenService.verifyAccessToken(invalidToken);
    expect(decoded).toBeNull();
  });

  it('should generate a refresh token', () => {
    const refreshToken = tokenService.generateRefreshToken();
    expect(refreshToken).toBeDefined();
    expect(refreshToken).toHaveLength(80); // 40 bytes in hex is 80 characters
  });
});
