import { SetMetadata } from '@nestjs/common';

export const DISABLE_GLOBAL_INTERCEPTOR = 'DISABLE_GLOBAL_INTERCEPTOR';

export const DisableGlobalInterceptor = () => SetMetadata(DISABLE_GLOBAL_INTERCEPTOR, true);
