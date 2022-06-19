import { v4 as uuidv4, validate } from 'uuid';

export const createUUID = (): string => {
  return uuidv4();
};

export const isUUIDValid = (UUID: string): boolean => {
  return validate(UUID);
};
