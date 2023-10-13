// src/app/config.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  getApiKey(): string {
    return process.env.firebaseAPIKey;
  }
}