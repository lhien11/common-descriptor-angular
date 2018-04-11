const schema = {
  "type": "object",
  "properties": {
    "IncidentID": {
      "type": "string"
    },
    "PersonID": {
      "type": "string"
    },
    "Last Name": {
      "type": "string",
      "Pattern": "^([A-Z -,&amp;]{1,30})$"
    },
    "First Name": {
      "type": "string"
    },
    "Middle Name": {
      "type": "string"
    },
    "Date of Birth": {
      "type": "string"
    },
    "SSN": { 
      "type": "string" 
    },
    "SID": { 
      "type": "string" 
    },
    "FBI": {
      "type": "string"
    },
    "Gender": {
      "type": "object",
      "properties": {
        "state": {
          "type": "string",
          "enum": [ "Male", "Female", "Unknown (Livescans)", "Unknown (Cardscans)" ]
        }
      }
    }
  }

};

export default schema;
