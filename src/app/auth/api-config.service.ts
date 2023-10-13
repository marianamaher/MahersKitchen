// src/app/config.service.ts

import { Injectable } from '@angular/core';


declare const process: {
    env: {
      NODE_ENV: string;
      firebaseAPIKey: string;
    };
  };

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  getApiKey(){
    return {
        production: process.env.NODE_ENV === 'production',
        apiKey: process.env.firebaseAPIKey || '',
        // Add other environment-specific variables as needed
      };
    // return (window as any).process?.env.firebaseAPIKey;
    // return process.env.firebaseAPIKey;
  }
}
