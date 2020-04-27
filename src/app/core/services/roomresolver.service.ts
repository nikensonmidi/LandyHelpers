import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Room, RoomsResolved } from '../models/room';
import { RoomService } from './room.service';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RoomsResolver implements Resolve<RoomsResolved> {

  constructor(private roomService: RoomService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoomsResolved> {

const results =  this.roomService.getRooms().snapshotChanges().pipe(
  map(changes =>
   //changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    ({

      rooms: changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))

  })
    ),
    catchError(error => {
      const errorMsg = `from resolver: ${error}`;
      return of({rooms: null, error: errorMsg});
    })
);
console.log(results);
return results;
  }
}
