import { actionPayloadConstructor } from '@mono/client-util';

import { TThemePayload } from './theme.interface';

const createAction = actionPayloadConstructor('UI');

export const setThemeState = createAction<TThemePayload>('Set UI state');
