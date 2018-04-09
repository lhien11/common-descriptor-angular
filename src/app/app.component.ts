import { Component } from '@angular/core';
import * as schema from './schema';
import * as data from './data';
import * as layout from './layout';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular JSON Schema Form Material Design Seed App';
  layout = layout.default;
  schema = schema.default;
  data = data.default;

  // onChanges = ($event) => {
  //   // this.data = JSON.stringify($event);

  // }


  displayData: any = null;

  exampleOnSubmitFn(formData) {
    this.displayData = formData;
    console.log(formData);
  }
}