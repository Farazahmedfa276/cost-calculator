import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {DayTaskInputFieldset, VehicleInputFieldset, HumanResourcesInputFieldset, MaterialsInputFieldset, CostCalculationFieldset, CostTypeInputFieldset, TimeZoneFieldset} from "./components";

const App = () => {
  const [data, setData] = useState(
    {
    "days":[
       {
          "date":"",
          "task":"",
          "totalVehicle": 0,
          "totalOtherCost": 0,
          "totalVehicleCost": 0,
          "totalResource": 0,
          "totalResourceCost": 0,
          "totalMaterialCost": 0,
          "drivers":[
             {
                "driver_name":"3.5T",
                "driver_value": "100",
                "miles":0,
                "days":0,
                "fuelcost":0,
                "cost":0
             }
          ],
          "resources":[
             {
                "resource_name":"3.5T Driver",
                "resource_Value": "120",
                "days":0,
                "overnight": false,
                "hours":0,
                "cost":0
             }
          ],
          "material":[
             {
                "material":"Pk 1 Carton",
                "materialValue": "1.5",
                "hours":0,
                "cost":0
             }
          ],
          "others":[
            {
               "otherService":"",
               "otherserviceValue": "",
               "currency":"",
               "currencyNotes":"",
               "margin":0,
               "cost":0,
               "withmarginCost": 0
            }
          ]
       }
    ],

    "costCalculation": {
      "VehicleTotalCost":0,
      "HumanTotalCost":0,
      "materialTotalCost":0,
      "TotalCost":0,
      "totalFualCost":0,
      "Fixed": 0,
      "markep":20,
      "other":0,
      "Quatation":0

    },
    "ZonePrice": {
      "selectedZone":"",
      "pricepercubicfeed":"",
      "numberofcubicfeed":0,
      "TotalCost":0,
    }

 });
 const [currentDataIndex, setCurrentDataIndex] = useState(0)

 useEffect(()=>{
   const params = new URLSearchParams(window.location.search);
    const dealId = params.get('DealId');
    if(!dealId){
      return;
    }
   (async () => {
      try {
         console.log("params", dealId);
         const response = await axios.post('https://leads.movinghomecompany.com/costingapp/GetFormData', { DealId: dealId});
         console.log(response.data.success);
         if(response.data.success){
            setData(response.data.data);
         }
      } catch (error) {
         console.log(error);
      }
      
    })();

   }, [])

 return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-4 col-12">
          <DayTaskInputFieldset data={data} setData={setData} currentDataIndex={currentDataIndex} setCurrentDataIndex={setCurrentDataIndex} />
          <TimeZoneFieldset  data={data} currentDataIndex={currentDataIndex} setData={setData} />
        </div>
        <div className="col-lg-5 col-12">
        <VehicleInputFieldset  data={data} currentDataIndex={currentDataIndex} setData={setData} />

        <HumanResourcesInputFieldset  data={data} currentDataIndex={currentDataIndex} setData={setData} />

        <MaterialsInputFieldset  data={data} currentDataIndex={currentDataIndex} setData={setData} />
        </div>
        <div className="col-lg-3 col-12">
        <CostCalculationFieldset data={data} />
        </div>
        <div className="col-12">
        <CostTypeInputFieldset  data={data} currentDataIndex={currentDataIndex} setData={setData} />
        </div>
      </div>
    </div>
  )
}

export default App;
