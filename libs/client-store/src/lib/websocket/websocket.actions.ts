import { actionPayloadConstructor } from '@mono/client-util';

import { TWebsocketPayload, WEBSOCKET_STATE_TOKEN } from './websocket.interface';

const createAction = actionPayloadConstructor(WEBSOCKET_STATE_TOKEN.getName());

export const connect = createAction('connect');

export const setState = createAction<TWebsocketPayload>('set state');

export const getEvents = createAction('get events');
