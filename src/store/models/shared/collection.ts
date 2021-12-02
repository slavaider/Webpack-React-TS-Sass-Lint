export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

// eslint-disable-next-line
export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKey: (element: T) => K
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getInitialCollectionModel();

  elements.forEach((element) => {
    const id = getKey(element);
    collection.order.push(id);
    collection.entities[id] = element;
  });

  return collection;
};

export const linearizedCollection = <K extends string | number, T>(
  elements: CollectionModel<K, T>
): T[] => elements.order.map((entity) => elements.entities[entity]);
