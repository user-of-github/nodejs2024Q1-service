import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY: string = 'isPublic' as const;
export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);
