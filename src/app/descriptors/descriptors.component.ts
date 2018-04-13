import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';


import { DataService } from '../data.service';


@Component({
  selector: 'app-descriptors',
  templateUrl: './descriptors.component.html',
  styleUrls: ['./descriptors.component.css']
})
export class DescriptorsComponent implements OnInit {
  title = 'Angular JSON Schema Form Material Design Seed App';
  //layout = layout.default;
  schema;
  sampleData = { "type": "object", "properties": {} };
  sampleLayout = [];
  dataOutput = {
    "PersonID": "XY123456",
    "Last Name": "REYNOR",
    "First Name": "JIM",
    "Middle Name": "XAVIER",
    "Date of Birth": "1911-11-11",
    "Sex": [
      "Male"
    ],
    "Race": "White"
  }
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
    //console.log(pickListMap);
    let descriptorMap = {};
    descriptors.map(dm => {
      descriptorMap[dm["@tag"]] = dm
    });

    for (let item in descriptorMap) {
      let data = descriptorMap[item];
      let displayName = data["Item"]["@displayName"];
      if (data["Item"] instanceof Array) {
        let innerData = data["Item"];
        innerData.forEach(element => {
          if (element["Pattern"]) {
            this.sampleData.properties[element["@displayName"]] = {
              "type": "string",
              "pattern": element["Pattern"]
            }
          } else {
            this.sampleData.properties[element["@displayName"]] = {
              "type": "string",
            }
          }
          this.sampleLayout.push({
            "key": element["@displayName"],
            "title": element["@displayName"]
          })
        });
      }
      else if (data["Item"]["DateEntry"]) {
        this.sampleData.properties[displayName] = {
          "type": "string",
        }
        this.sampleLayout.push({
          "key": displayName,
          "title": displayName,
          "type": "date"
        })
      }
      else if (data["Item"]["PickList"]) {
        let pickListArray = pickListMap[data["Item"]["PickList"]["#text"]];
        //console.log(data["Item"]["PickList"]["@multi"]);
        let multiSelect = data["Item"]["PickList"]["@multi"];
        let enumArray = [];
        let selectDescription = {};
        pickListArray["Item"].forEach(element => {
          enumArray.push(element.Description);
        });
        if (multiSelect === "true") {

          this.sampleData.properties[displayName] = {
            "type": "array",
            "items": {
              "type": "string",
              "enum": enumArray
            }

          }
          this.sampleLayout.push({
            "key": displayName,
            "title": displayName,
            "type": "checkboxes",
            "titleMap": enumArray

          })
        }
        else {
          this.sampleData.properties[displayName] = {
            "type": "string",
            "enum": enumArray
          }
          this.sampleLayout.push({
            "key": displayName,
            "title": displayName,
            "type": "select",
            "titleMap": enumArray

          })

        }
      }
      else {
        let regxPattern = data["Item"]["Pattern"];
        if (regxPattern) {
          this.sampleData.properties[displayName] = {
            "type": "string",
            "pattern": regxPattern
          }
        } else {
          this.sampleData.properties[displayName] = {
            "type": "string",
          }
        }
        this.sampleLayout.push({
          "key": data["Item"]["@displayName"],
          "title": data["Item"]["@displayName"],
        })
      }


    }

    this.schema = this.sampleData;
    // console.log("Json: ", JSON.stringify(this.schema, null, 2));
    // console.log("Sample Layout: ", JSON.stringify(this.sampleLayout, null, 2));

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

    })

    this.dataService.getDescriptorSchema().subscribe(results => {
      if (!results) {
        return;
      }
      this.descriptorSchema = results;
    })
  }



}
