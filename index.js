'use strict';

const apiKey= '2Q0Cm37SjyJUkyP727rPz4Z7VOoB4TW17P0OQVMv';
const baseUrl= 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


function displayResults(responseJson, maxResults) {
    console.log(responseJson);
   
    $('#js-error-message').empty();
    $('#results').empty();
    
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('#results').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`);
    }
    $('#results').removeClass('hidden');
}


function getParks(stateArr, maxResults){
    const params= {
        stateCode: stateArr,
        limit: maxResults
    };
    const queryString= formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    })

}


function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const stateArr= $('#js-search-term').val().split(",");
        const maxResults= $('#js-max-results').val();
        getParks(stateArr, maxResults);
    });
}


$(watchForm);