import { Injectable } from '@angular/core';
import { Glasses } from '../Models/Glasses';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlassesService {

  id = '5c48517c4533aa48a09504d7';

  glasses: Glasses;
  glssesObservable: Observable<Glasses>;
  glassesSubject: Subject<Glasses> = new Subject<Glasses>();


  constructor(private http: HttpClient) {
    this.glasses = new Glasses();
    this.glassesSubject.asObservable();
  }


  updateGlasses(id) {
    this.http.put<Glasses>(`/updateGlasses/${id}`, this.glasses).subscribe((data) => {
    });
  }

  getGlasses(id) {
    this.http.get<Glasses>(`/glasses/${id}`).subscribe((data) => {
      this.glasses = this.deepCopy(data, new Glasses());
      this.glassesSubject.next(this.glasses);
    });
  }

  getSpot(isRight, spotIndex) {
    return this.glasses.getSpot(isRight, spotIndex);
  }

  deepCopy(newObj, oldObj) {
  for (const key in newObj) {
    if (typeof newObj[key] === 'object') {
     oldObj[key] = this.deepCopy(newObj[key], oldObj[key]);
    } else {
      oldObj[key] = newObj[key];
    }
  }
  return oldObj;
}
}
