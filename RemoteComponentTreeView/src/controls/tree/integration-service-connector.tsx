export const GetIntServiceUrl = () => window.location.origin + "/integration/OData/";

async function executeGetRequestAsync(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
 }

 function executeGetRequest(url: string, async: boolean = false) {
    const request = new XMLHttpRequest();
    request.open('GET', url, async);
    request.send();
    return request;
}

export function GetAllActionItemExecutionTaskForLeadTask(taskId: number) {
    const url = GetIntServiceUrl() + `Tree/GetTreeStructureActionItemExecutionTask(id=${taskId})`;
    try {
      const response = executeGetRequest(url);
      console.log(response);
      const resonseJson = JSON.parse(response.responseText);
      console.log("json", resonseJson);
      return resonseJson.value;
    } catch (error: any) {
      console.log('Error request:', error);
      return null;
    }
}


export async function GetAllActionItemExecutionTaskForLeadTaskAsync(taskId: number) {
    const url = GetIntServiceUrl() + `Tree/GetTreeStructureActionItemExecutionTask(id=${taskId})`;
    try {
      const response = await executeGetRequestAsync(url);
      console.log(response);
      return response.value;
    } catch (error) {
      console.error('Error request:', error);
      return null;
    }
}