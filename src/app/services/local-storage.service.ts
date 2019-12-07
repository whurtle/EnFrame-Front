import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_username';

@Injectable()
export class LocalStorageService {
  anotherUser = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(anotherUser: string): void {
    const currentUsername = this.storage.get(STORAGE_KEY) || [];
    currentUsername.push({
      username: anotherUser,
      isLoggedIn: false
    });
    this.storage.set(STORAGE_KEY,   currentUsername);
    console.log(this.storage.get(STORAGE_KEY) || 'Local storage is empty');
    
  }
}
