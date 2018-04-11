import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getDescriptorData(): Observable<Object> {
    return this.http.get<Object>('../assets/common_desciptor/descriptor_data.json');
  }

  getDescriptorSchema(): Observable<Object>{
    return this.http.get<Object>
    ('../assets/common_desciptor/descriptor_set_config.json');
  }

  getDescriptorDefinition(): Observable<Object>{
    return this.http.get<Object>
    ('../assets/common_desciptor/picklist.json');
  }



}
