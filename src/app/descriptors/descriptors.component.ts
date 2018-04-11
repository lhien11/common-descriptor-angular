import { Component, OnInit, Input } from '@angular/core';

import * as schemas from '../schema';
import * as data from '../data';
import * as layout from '../layout';
import { DataService } from '../data.service';


@Component({
  selector: 'app-descriptors',
  templateUrl: './descriptors.component.html',
  styleUrls: ['./descriptors.component.css']
})
export class DescriptorsComponent implements OnInit {
  title = 'Angular JSON Schema Form Material Design Seed App';
  //layout = layout.default;
  schemas = schemas.default;
  schema; 
  data = data.default;
  sampleData = {"type": "object", "properties": {}};
  layout; 

  displayData: any = null;

  exampleOnSubmitFn(formData) {
    this.displayData = formData;
    console.log(formData);
  }

  private _descriptorData;
  private _descriptorSchema;
  private _descriptorDefinition;
  private _pickListItem = [];

  @Input()
  set descriptorData(val) {
    this._descriptorData = val;

  }
  get descriptorData() {
    return this._descriptorData;
  }

  @Input()
  set descriptorSchema(val) {
    this._descriptorSchema = val;
    // to do mapping 
    //console.log("descriptor data ", this._descriptorData);
    // console.log("desciptor definition: ", this._descriptorDefinition);

  }
  get descriptorSchema() {
    return this._descriptorSchema;
  }

  @Input()
  set descriptorDefinition(val) {
    this._descriptorDefinition = val;

    let descriptors = this._descriptorSchema.DescriptorSet.Descriptor;
    let picklistDefinition = this._descriptorDefinition.PickListDef.PickList;

    
    let pickListMap = {};
    picklistDefinition.forEach(
      pl => pickListMap[pl["@name"]] = pl
    );
    
    console.log(pickListMap);
    console.log(pickListMap['yesNo_pl']);

    for (let i = 0; i < descriptors.length; i++) {
      if (descriptors[i]["@tag"]) {
        // console.log(descriptors[i]["Item"]);
        console.log("@tag ", descriptors[i]["@tag"]);
      
        this.sampleData.properties[descriptors[i]["@tag"]] = {
          "type":"string"
        } ; 
        if (descriptors[i]["Item"]["PickList"]) {
          // console.log("Picklist: ", typeof (descriptors[i]["Item"]["PickList"]["#text"]));

          // for (let indexPick = 0; indexPick < picklistDefinition.length; indexPick++) {
          //   //console.log("picklistDefinition ", picklistDefinition[indexPick]["@name"]);
          //   if (descriptors[i]["Item"]["PickList"]["#text"] === picklistDefinition[indexPick]["@name"]) {
          //     // console.log(picklistDefinition[indexPick]["Item"]);

          //   }
          // }
            if (pickListMap[descriptors[i]["Item"]["PickList"]["#text"]]) {
              console.log("I am here");
            }
          // this._pickListItem.push(descriptors[i]["Item"]["PickList"]);

        }

      }
    }

    this.schema = this.sampleData;
    console.log("Json: ", this.schema);






  }
  get descriptorDefinition() {
    return this._descriptorDefinition;
  }


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDescriptorData().subscribe(results => {
      if (!results) {
        return;
      }
      this.descriptorData = results;

    })

    this.dataService.getDescriptorDefinition().subscribe(results => {
      if (!results) {
        return;
      }
      this.descriptorDefinition = results;
      //console.log("desciptors Definition: ", this.descriptorDefinition);

    })

    this.dataService.getDescriptorSchema().subscribe(results => {
      if (!results) {
        return;
      }
      this.descriptorSchema = results;
      //console.log("desriptors Schema: ", this.descriptorSchema);
    })




   // console.log("Json: ", this.schemas);
    //console.log("mySchema: ", this.schema);

  }



}
