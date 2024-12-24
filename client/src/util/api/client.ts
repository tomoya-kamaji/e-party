'use client';
import { hc } from 'hono/client';
import type { AppType } from '../../../../backend/src/index';

export const honoClient = hc<AppType>('/');
