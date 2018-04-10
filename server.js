// var http = require('https'); // protocol
// var database = require("./DatabaseUtility.js");
const util = require('util');
// var api = require('instagram-node').instagram();
let querystring = require('querystring');
let request = require('request');


//TODO change to https
let http = require('http')
    , fs   = require('fs')
    , url  = require('url')
    , port = 8080;


var contentType = Object.freeze({
    "HTML":"text/html",
    "CSS":"text/css",
    "JAVASCRIPT":"application/javascript",
    "PNG":"image/png",
})


let server = http.createServer (function (req, res) {

    let uri = url.parse(req.url);

    let found = false;

    switch( uri.pathname ) {

        case '/data':
            //Fetch the data and then run calculations on it MOVE THIS TO ANOTHER RESOURCE
            fetchData().then(function(data) {
                iterateData(data).then(function(extractedData) {
                    //normalizeData(extractedData).then(function(normalizedData) {
                        sendData(res, extractedData)
                    //})

                })
            });
            found = true;
            break;

        case '/':
            found = true;
            sendResource(res, 'src/index.html', contentType.HTML);
            break;
        case '/index.html':
            sendResource(res, 'src/index.html', contentType.HTML);
            found = true;
            break;
        case '/src/css/style.css':
            sendResource(res, 'src/css/style.css', contentType.CSS);
            found = true;
            break;
        case '/css/round-about.css':
            sendResource(res, 'css/round-about.css', contentType.CSS);
            found = true;
            break;
        case '/vendor/bootstrap/css/bootstrap.min.css':
            sendResource(res, 'vendor/bootstrap/css/bootstrap.min.css', contentType.CSS);
            found = true;
            break;
        case '/vendor/bootstrap/css/bootstrap.min.css.map':
            sendResource(res, '/vendor/bootstrap/css/bootstrap.min.css.map', contentType.CSS);
            found = true;
            break;
        case '/vendor/jquery/jquery.min.js':
            sendResource(res, 'vendor/jquery/jquery.min.js', contentType.JAVASCRIPT);
            found = true;
            break;
        case '/vendor/bootstrap/js/bootstrap.bundle.min.js':
            sendResource(res, '/vendor/bootstrap/js/bootstrap.bundle.min.js', contentType.JAVASCRIPT);
            found = true;
            break;
        case '/src/andrewmanu.png':
            sendResource(res, 'src/andrewmanu.png', contentType.PNG);
            found = true;
            break;


        default:
            res.end('404 not found')
    }

    console.log("found? "+ found+" resource: "+uri.pathname);

})

server.listen(process.env.PORT || port);
console.log('listening on 8080')


/**
 * Format the response to reply to the client
 * @param res - response to client
 * @param filename - resource that has been requested
 * @param type - type of the resource
 */

function sendResource(res, filename, type) {
    fs.readFile(filename, function (error, content) {
        res.writeHead(200, {'Content-type': type});
        res.end(content, 'utf-8');
    })

}

/**
 * return data requested by the client
 * @param res - response to client
 * @param data - data to send
 */
function sendData(res, data) {
    res.end(JSON.stringify(data));
}




// fetchData - fetch stats
// https://fantasy.premierleague.com/drf/bootstrap-static
function fetchData () {
    console.log("++++++++++");

    return new Promise(function(success, fail) {

        request(' https://fantasy.premierleague.com/drf/bootstrap-static', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body); // Print the HTML for the Google homepage.

            bodyObject = JSON.parse(body);

            //playerOne = bodyObject.elements[0]["web_name"]
            //console.log("playerOne: "+playerOne)
            success(bodyObject.elements)
        });

    });
}


/**
 * Iterate through the returned data set
 * @param data
 */
function iterateData(data) {
    return new Promise(function (success, fail) {
        var teamData = {};

        var i;
        for (i = 0; i < data.length; i++) {
            teamCode = teamCodes[data[i].team_code];
            playerFantasyPoints = data[i].total_points;

            if (teamCode in teamData) {
                teamData[teamCode] += playerFantasyPoints
            } else {
                teamData[teamCode] = playerFantasyPoints
            }
        }
        console.log(teamData);
        success(teamData);
    })
}



//Used to convert the online API data to team strings
var teamCodes = Object.freeze({
    91:"A.F.C. Bournemouth",
    3:"Arsenal",
    36:"Brighton & Hove Albion F.C.",
    90:"Burnley F.C.",
    8:"Chelsea",
    31:"Crystal Palace F.C.",
    11:"Everton",
    38:"Huddersfield Town",
    13:"Leicester City F.C.",
    14:"Liverpool F.C.",
    43:"Manchester City F.C.",
    1:"Manchester United F.C.",
    4:"Newcastle United F.C.",
    20:"Southampton F.C.",
    110:"Stoke City F.C.",
    80:"Swansea City A.F.C.",
    6:"Tottenham Hotspur F.C.",
    57:"Watford F.C.",
    35:"West Bromwich Albion F.C.",
    21:"West Ham United F.C.",
})



