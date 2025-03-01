import { getAccessToken } from './token-access';

export async function getWithToken(url: string): Promise<any> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error('Access token not found');
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

export async function postWithToken(
  url: string,
  data: Record<string, any>
): Promise<any> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error('Access token not found');
  }

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
