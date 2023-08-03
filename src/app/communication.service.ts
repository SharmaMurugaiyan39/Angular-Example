import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private contentSource = new BehaviorSubject<string>('Item 1');
  currentContent = this.contentSource.asObservable();

  constructor() {}

  changeContent(content: string) {
    this.contentSource.next(content);
  }
}
