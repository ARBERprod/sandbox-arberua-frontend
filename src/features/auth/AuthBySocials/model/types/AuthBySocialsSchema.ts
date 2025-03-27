import { GoogleAuthData } from '../../lib/GoogleAuthData';

export interface AuthBySocialsSchema {
  google: {
    isModalOpen: boolean;
    data: GoogleAuthData | null;
  }
}
