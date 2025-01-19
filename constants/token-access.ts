import * as SecureStorage from 'expo-secure-store';
import { User } from './models';
import { jwtDecode } from 'jwt-decode';

export const getAccessToken = async () => {
  return await SecureStorage.getItemAsync('jwt_token');
}

export const storeAccessToken = async (accessToken: string) => {
  await SecureStorage.setItemAsync('jwt_token', accessToken);
}

export const deleteAccessToken = async () => {
  await SecureStorage.deleteItemAsync('jwt_token');
}

export const getUserDetails = async (): Promise<User | undefined> => {
  const accessToken = await getAccessToken();

  if (!accessToken) return;

  return jwtDecode(accessToken) as User;
}