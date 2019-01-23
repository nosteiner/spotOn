import { Injectable } from '@angular/core';
import { Glasses } from '../Models/Glasses';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlassesService {

  glasses: Glasses;

  constructor(private http: HttpClient) {
    this.glasses = new Glasses();

  }


  updateGlasses() {
    this.http.put<Glasses>(`/updateGlasses/5c48517c4533aa48a09504d7`, this.glasses).subscribe((data) => {
    });
  }
  
  getGlasses() {
    this.http.get<Glasses>('/glasses/5c48517c4533aa48a09504d7').subscribe((data) => {
      this.glasses = this.deepCopy(data, new Glasses());
    });
  }

  getSpot(isRight, spotIndex) {
    console.log(isRight);
    return this.glasses.getSpot(isRight, spotIndex);
  }

  deepCopy(newObj, oldObj) {
  for (let key in newObj) {
    if (typeof newObj[key] === 'object') {
     oldObj[key] = this.deepCopy(newObj[key], oldObj[key]);
    } else {
      oldObj[key] = newObj[key];
    }
  }
  return oldObj;
}
}
