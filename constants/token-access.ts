import * as SecureStorage from 'expo-secure-store';

export const getAccessToken = async () => {
  return await SecureStorage.getItemAsync('jwt_token');
}

export const storeAccessToken = async (accessToken: string) => {
  await SecureStorage.setItemAsync('jwt_token', accessToken);
}

export const deleteAccessToken = async () => {
  await SecureStorage.deleteItemAsync('jwt_token');
}