import {
  ControlUpdateHandler,
  IEntity,
  IRemoteComponentCardApi,
  IRemoteComponentCoverApi,
  IRemoteCoverActionMetadata
} from '@directum/sungero-remote-component-types';

// Элементов в JSON не должно быть undefined — при разворачивании массива
// через спред дырки превратятся в undefined и сломают коллекцию.
// eslint-disable-next-line unicorn/no-array-callback-reference
const createChildCollection = <T>(
  items: T[]
): T[] & {
  readonly length: number;
  addNew(): Promise<void>;
  remove(item: T): Promise<void>;
  forEach(cb: (item: T, index: number) => void): void;
  filter(predicate: (item: T, index: number) => boolean): T[];
  find(predicate: (item: T, index: number) => boolean): T | undefined;
  map<R>(cb: (item: T, index: number) => R): R[];
  sort(comparator: (a: T, b: T) => number): T[];
} => {
  const push = Array.prototype.push.bind(items);
  const splice = Array.prototype.splice.bind(items);

  return Object.assign([...items], {
    length: items.length,
    addNew: async () => {
      push({} as T);
      return Promise.resolve();
    },
    remove: async (item: T) => {
      const idx = items.findIndex(el => el === item);
      if (idx !== -1) splice(idx, 1);
    },
    forEach: (cb: (item: T, index: number) => void) => items.forEach(cb),
    filter: (predicate: (item: T, index: number) => boolean) => items.filter(predicate),
    find: (predicate: (item: T, index: number) => boolean) => items.find(predicate),
    map: <R>(cb: (item: T, index: number) => R) => items.map(cb),
    sort: (comparator: (a: T, b: T) => number) => [...items].sort(comparator)
  });
};

/**
 * Заглушка API для отладки в режиме standalone. Реализует Card API и Cover API.
 */
class HostStubApi implements IRemoteComponentCardApi, IRemoteComponentCoverApi {
  // Мутабельный источник данных сущности. changeProperty и коллекция меняют этот объект.
  private entityData = {
    Subject: 'Тестовая тема',
    Note: 'Тестовое примечание',
    Title: '',
    PerformedWorkDetails: [
      {
        Id: 42,
        DisplayValue: 'Child Entity',
        Title: 'Работа 1',
        JobKind: 1,
        Duration: 8,
        Comment: 'Работал'
      },
      {
        Id: 43,
        DisplayValue: 'Child Entity',
        Title: 'Работа 2',
        JobKind: 1,
        Duration: 5,
        Comment: 'Работал'
      }
    ]
  };

  // eslint-disable-next-line class-methods-use-this
  public executeAction(actionName: string): Promise<void> {
    console.log(`Action ${actionName} executed.`);
    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  public canExecuteAction(actionName: string): boolean {
    return true;
  }

  public getEntity<T extends IEntity>(): T {
    const data = this.entityData;

    return {
      Id: 1,
      DisplayValue: 'Test Entity',
      Subject: data.Subject,
      Note: data.Note,
      Title: data.Title,
      State: {
        IsEnabled: true,
        Properties: [
          { Name: 'Subject', IsEnabled: true, IsRequired: false, IsVisible: true },
          { Name: 'Note', IsEnabled: true, IsRequired: false, IsVisible: true },
          { Name: 'Title', IsEnabled: false, IsRequired: true, IsVisible: true }
        ]
      },
      Info: {
        properties: [
          {
            name: 'Subject',
            type: 'string',
            displayValue: 'Тема'
          },
          { name: 'Note', type: 'string', displayValue: 'Примечание' },
          {
            name: 'Title',
            type: 'string',
            displayValue: 'Заголовок'
          },
          {
            name: 'PerformedWorkDetails',
            type: 'IChildEntityCollection',
            displayValue: 'Выполненные работы'
          }
        ]
      },
      LockInfo: null,
      async changeProperty(propertyName: string, newValue: string) {
        (data as Record<string, unknown>)[propertyName] = newValue;
        console.log(`changeProperty: ${propertyName} = ${newValue}`);
      },
      PerformedWorkDetails: createChildCollection(data.PerformedWorkDetails)
    } as unknown as T;
  }

  public onControlUpdate?: ControlUpdateHandler;

  public getActionsMetadata(): IRemoteCoverActionMetadata[] {
    return [
      {
        id: '00000000-0000-0000-0000-000000000001',
        title: 'Действие 1',
        description: 'Тестовое действие №1'
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        title: 'Действие 2',
        description: 'Тестовое действие №2'
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        title: 'Действие 3',
        description: 'Тестовое действие №3 с проверкой статуса'
      }
    ];
  }

  public async getSettings(): Promise<Record<string, string>> {
    return {
      setting1: 'value1',
      setting2: 'value2',
      setting3: 'value3'
    };
  }
}

const api: IRemoteComponentCardApi & IRemoteComponentCoverApi = new HostStubApi();
export default api;
