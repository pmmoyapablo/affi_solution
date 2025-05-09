export interface TokenRequest {
    username: string;
    password: string;
  }
  
  export interface TokenResponse {
    token: string;
    auth: boolean;
    message: string;
  } 