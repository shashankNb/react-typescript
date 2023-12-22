export const ID_SEPARATOR = '_';

export const Utils = {
    getEntityId: (featureId: string, separatorKey: string) => featureId + ID_SEPARATOR + separatorKey
}
