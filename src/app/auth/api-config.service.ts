// src/app/config.service.ts

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  getApiKey(): string {
    return environment.firebaseAPIKey;
  }
}
