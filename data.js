var apiKey = 'AIzaSyCHyTTgLqvBm7JcbsDYW-o5yN2nGrkTmjQ'
var clientId = '259028348043-uqmdlr9dgh5lqi1hu2d1466d8cm0t5lt.apps.googleusercontent.com'
var spreadsheetID = '1kcrL9__YQdhs6ON9UFesYuxuiPStyOypRgMWuA1ivIg'
var range = "'Form Data'!B1:D"

// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
// https://developers.google.com/sheets/api/samples/reading

/*
    BEFORE RUNNING:
    ---------------
    1. If not already done, enable the Google Sheets API
       and check the quota for your project at
       https://console.developers.google.com/apis/api/sheets
    2. Get access keys for your application. See
       https://developers.google.com/api-client-library/javascript/start/start-js#get-access-keys-for-your-application
    3. For additional information on authentication, see
       https://developers.google.com/sheets/api/quickstart/js#step_2_set_up_the_sample
*/

    function makeApiCall() {
      var params = {
        // The ID of the spreadsheet to retrieve data from.
        spreadsheetId: spreadsheetID,

        // The A1 notation of the values to retrieve.
        range: range,

        // https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption
        // How values should be represented in the output.
        // The default render option is ValueRenderOption.FORMATTED_VALUE.
        valueRenderOption: 'FORMATTED_VALUE',  // TODO: Update placeholder value.

        // https://developers.google.com/sheets/api/reference/rest/v4/DateTimeRenderOption
        // How dates, times, and durations should be represented in the output.
        // This is ignored if value_render_option is
        // FORMATTED_VALUE.
        // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
        dateTimeRenderOption: 'FORMATTED_STRING',  // TODO: Update placeholder value.
      };

      var request = gapi.client.sheets.spreadsheets.values.get(params);
      
      
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
        // store response
        result = response.result;
        // fire at will - sorry will 
        convertResultToIndividualArraysAndFireCharts()

      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
        // use hard coded values and fire anyway
        convertResultToIndividualArraysAndFireCharts()
        
      });
    }



    function initClient() {
      var API_KEY = apiKey;  // TODO: Update placeholder with desired API key.

      var CLIENT_ID = clientId;  // TODO: Update placeholder with desired client ID.

      // TODO: Authorize using one of the following scopes:
      //   'https://www.googleapis.com/auth/drive'
      //   'https://www.googleapis.com/auth/drive.file'
      //   'https://www.googleapis.com/auth/drive.readonly'
      //   'https://www.googleapis.com/auth/spreadsheets'
      //   'https://www.googleapis.com/auth/spreadsheets.readonly'
      var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly' //https://run.plnkr.co/t2ySwW3eNzRjmp9I/index.html';

      gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }



    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
    }

    function updateSignInStatus(isSignedIn) {
      if (isSignedIn) {
        makeApiCall();
      }
    }

    function handleSignInClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignOutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }


// $(".p-label").html('<image xlink:href="http://i.imgur.com/lpsn2c1.jpg" height="50px" width="50px"/>')
function convertResultToIndividualArraysAndFireCharts() {

    // create individual (global) buckets
    kyle = []
    angel = []
    bryan = []
    parker = []

    for (i = 1 ; i< result.values.length; i++) {
        var value = result.values[i]
        var obj = {
        x: Date.parse(value[2]),
        y: +value[1]
        }
        if (value[0] == "Dad") bryan.push(obj)
        if (value[0] == "Parker") parker.push(obj)
        if (value[0] == "Angel") angel.push(obj)
        if (value[0] == "Kyle") kyle.push(obj)
    }

    BuildGrid();
}

// hardcode in case we can't find it
result = {
  "range": "'Form Data'!B1:D103",
  "majorDimension": "ROWS",
  "values": [
    [
      "Name",
      "Weight (lbs)",
      "Weigh In Day"
    ],
    [
      "Kyle",
      "214",
      "9/5/2017"
    ],
    [
      "Parker",
      "280",
      "9/5/2017"
    ]
  ]
}

