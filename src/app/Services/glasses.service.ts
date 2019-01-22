import { Injectable } from '@angular/core';
import { Glasses } from '../Models/Glasses';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlassesService {

glasses: Glasses;
glassesSbject: Subject<Glasses> = new Subject<Glasses>();
glassesObservable: Observable<Glasses>;

  constructor(private http: HttpClient) {
    this.glasses = new Glasses();
    // this.glassesObservable = this.glassesSbject.asObservable();
    // this.getGlasses();
   }

  updateGlasses() {
    this.http.put<Glasses>(`/updateGlasses`, this.glasses).subscribe(() => {
      this.getGlasses();
    });
  }

  getGlasses() {
    // this.http.get<Glasses>('/glasses').subscribe((data) => {
    //   this.glasses = data;
    //   console.log( typeof this.glasses);
    //   this.glassesSbject.next( this.glasses = data);
    // });
    return this.glasses;
  }

  getSpot(isRight, spotIndex) {
    console.log(isRight)
    return this.glasses.getSpot(isRight, spotIndex);
  }
}
