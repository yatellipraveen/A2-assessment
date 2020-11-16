window.onload = getAirQualityIndex;

let airQualityIndexData;
let sortCityOrderAscending=true;
let sortPollutantOrderAscending=true;

function getAirQualityIndex(){
    return fetch("https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=10")
        .then(response=>{ return response.json()})
        .then(response=>{
            airQualityIndexData = response.records;
            generateTable(airQualityIndexData);
        })
}

function generateTable(airQualityIndexData){
    for(state of airQualityIndexData){
        generateRow(state);
    }
    
    console.log(airQualityIndexData);
}

function generateRow(stateData){
    let tbody = document.querySelector('.table-body');
    let trow=document.createElement("tr");
    trow.appendChild(generateColumn(stateData.city,'City'));
    trow.appendChild(generateColumn(stateData.station,'Pollutant ID'));
    trow.appendChild(generateColumn(stateData.pollutant_avg,'Pollutant avg'));
    tbody.appendChild(trow);
}
function generateColumn(textData,label){
    let td = document.createElement('td');
    let div = document.createElement('div');
    let textNode = document.createTextNode(textData);
    div.appendChild(textNode);
    div.classList.add('d-inline-block') 
    div.classList.add('block-width');
    td.appendChild(div);
    td.setAttribute('data-label',label);
    return td;
}
function deleteTable(){
    let tbody = document.querySelector('.table-body');
    tbody.querySelectorAll('*').forEach(n => n.remove());
}
function sortByCity(){
    if (sortCityOrderAscending ) {
        airQualityIndexData.sort((a, b) => (a.city.toLowerCase() >= b.city.toLowerCase()) ? 1 :  -1)
    } else {
        airQualityIndexData.sort((a, b) => (a.city.toLowerCase() < b.city.toLowerCase()) ? 1 :  -1)
    }
    deleteTable();
    generateTable(airQualityIndexData);
    sortCityOrderAscending=!sortCityOrderAscending;
}
function sortByPollutantAvg(){
    if (sortPollutantOrderAscending ) {
        airQualityIndexData.sort((a, b) => ( parseInt(a.pollutant_avg) >= parseInt(b.pollutant_avg)) ? 1 :  -1)
    } else {
        airQualityIndexData.sort((a, b) => (parseInt(a.pollutant_avg)< parseInt(b.pollutant_avg)) ? 1 :  -1)
    }
    deleteTable();
    generateTable(airQualityIndexData);
    sortPollutantOrderAscending=!sortPollutantOrderAscending;
}
function filterByCity(){
    let input = document.querySelector("#cityFilter");
    let filteredTbale = airQualityIndexData.filter(record=>((record.city).toLowerCase()).includes((input.value).toLowerCase()));
    deleteTable();
    generateTable(filteredTbale);
}
function sortTable(){
    let input = document.querySelector("#sortBox");
    if(input.value==='city'){
        sortCityOrderAscending=true;
        sortByCity();
    }else if(input.value==='pollutant'){
        sortPollutantOrderAscending=true;
        sortByPollutantAvg();
    }
}