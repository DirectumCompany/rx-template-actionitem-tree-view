import { getAbsoluteUrl, executeGetRequestAsync} from './request';
import { ITask } from './interface/task';

export async function getAllActionItemExecutionTaskForLeadTaskAsync(taskId: number): Promise<ITask> {
    const url = getAbsoluteUrl(`Tree/GetTreeStructureActionItemExecutionTask(id=${taskId})`);
    const response = await executeGetRequestAsync<ITask>(url);

    console.log(response);

    return response;
}