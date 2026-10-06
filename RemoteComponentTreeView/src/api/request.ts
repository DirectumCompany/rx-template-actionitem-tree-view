import { getIntegrationServiceUrl } from '../utils/settings'

export const getAbsoluteUrl = (relativeUrl: string) => getIntegrationServiceUrl() + relativeUrl;

export async function throwResponseError(response: Response): Promise<never> {
    let body: string | undefined;
    try {
      body = await response.text();
    } catch {
      body = undefined;
    }
    const details = body ? ` ${body}` : '';
    throw new Error(`Request failed ${response.status} ${response.statusText}${details}`);
  }

export async function executeGetRequestAsync<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok)
      await throwResponseError(response);
    return (await response.json()) as T;
 }