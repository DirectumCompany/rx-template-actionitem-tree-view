import { getAbsoluteUrl, executeGetRequestAsync} from '../utils/request';
import { ITask } from '../controls/tree/types';

export async function getAllActionItemExecutionTaskForLeadTaskAsync(taskId: number): Promise<ITask> {
    const url = getAbsoluteUrl(`Tree/GetTreeStructureActionItemExecutionTask(id=${taskId})`);
    const response = await executeGetRequestAsync<ITask>(url);

    console.log(response);

    return response;
}