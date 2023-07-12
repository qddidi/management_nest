import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
