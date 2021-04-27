export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName: string;  
    phoneNumber?: string;
    providerId?: string;
    isEmailVerified?: boolean
  }