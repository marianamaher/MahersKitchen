import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  getFirebaseAPIKey(): string {
    if (environment.production) {
      // Use placeholder value during production
      return 'default-production-api-key';
    } else {
      // Use placeholder value during development
      return environment.firebaseAPIKey;
    }
  }
}
