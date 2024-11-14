import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  changeImages(
    array: string[], 
    currentIndex: number, 
    endPosition: boolean, 
    time: number,
    onUpdate: (newImage: string, newIndex: number, endPosition: boolean) => void
  ) {
    if (!endPosition) {
      const interval = setInterval(() => {
        if (currentIndex < array.length - 1) {
          currentIndex++;
        } else {
          endPosition = true;  
          clearInterval(interval);
        }
        onUpdate(array[currentIndex], currentIndex, endPosition);
      }, time);
    } else { 
      const interval = setInterval(() => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          endPosition = true;  
          clearInterval(interval);
        }
        onUpdate(array[currentIndex], currentIndex, endPosition);
      }, time);
    }
  }
}
