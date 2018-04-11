const layout = [
    // { "type": "flex", "flex-flow": "row wrap", "items": [ "IncidentID", "PersonID" ]},
    { "key": "IncidentID", "title": "Incident ID"},
    { "key": "PersonID", "title": "PersonID"},
    { "key": "Last Name", "title": "Last Name" },
    { "key": "First Name", "title": "First Name" },
    { "key": "Middle Name", "title": "Middle Name" },
    { "key": "Date of Birth", "type": "date" },
    { "key": "SSN", "title": "Social Security Number" },
    { "key": "SID", "title": "State Identification Number" },
    { "key": "FBI", "title": "FBI Number" }, 
    { "type": "div",
      "display": "flex",
      "flex-direction": "row",
      "items": [

        { "key": "Gender.state", "flex": "1 1 50px",
          "notitle": true, "placeholder": "Gender"
        }
      ]
    },


    
]

  
  
  export default layout;
  