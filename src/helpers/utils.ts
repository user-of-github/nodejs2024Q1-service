import * as crypto from 'node:crypto';
import type { Track } from '../types/Track';
import type { Album } from '../types/Album';
import type { Artist } from '../types/Artist';

// @TODO: FOR ( I HOPE TEMP) HACK :) ... Sorry
export const convertFavoritesSubItem = <ValueType extends Track | Album | Artist>(items: ValueType[]): ValueType[] => {
  return items.map((item) => {
    const { isFavorite, ...rest } = item;
    return rest as ValueType;
  });
};

export const hash = (source: string): string => {
  return crypto.createHash('md5').update(source).digest('hex');
};
