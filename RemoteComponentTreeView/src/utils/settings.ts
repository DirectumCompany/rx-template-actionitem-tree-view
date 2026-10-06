import { IRemoteComponentApi } from "@directum/sungero-remote-component-types";
import { INTEGRATION_SERVICE_URL_SETTING_KEY, INTEGRATION_SERVICE_ODATA_ENDPOINT } from "./constants";

let integrationServiceUrl: string;
export const getIntegrationServiceUrl = (): string => integrationServiceUrl;
const setIntegrationServiceUrl = (value: string) => integrationServiceUrl = value;

export async function setIntegrationServiceUrlFromConfig(remoteComponentApi: IRemoteComponentApi) {
  console.log('start setIntegrationServiceUrlFromConfig');
  if (!getIntegrationServiceUrl()) {
    var settings = await remoteComponentApi.getSettings();
    var url = settings[INTEGRATION_SERVICE_URL_SETTING_KEY];
    if (!url)
      url = `${window.location.origin}/integration/${INTEGRATION_SERVICE_ODATA_ENDPOINT}/`;
    setIntegrationServiceUrl(url);
  }
}