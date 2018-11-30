var querystring = require('querystring');

var values = {
    durl: "https://byui.az1.qualtrics.com/jfe/form/SV_86Me8dPkxZlU0Hb",
    checkem: "on",
    inum: "on",
    flname: "on",
    email: "on",
    usern: "on",
    coursename: "on",
    siscID: "on",
    coursenum: "on",
    secnum: "on",
    sistID: "on",
    iemail: "on",
    ifname: "on",
    ilname: "on",
    module: "on",
    lname: "on",
    lid: "on",
    grade: "on",
    points: "1",
    habitude_LMS: "Canvas",
    habitude_WeekNo: 12,
    loc: "new"
};

var secondValues = {
    curl: "https://byui-lti-to-url.azurewebsites.net:443/",
    parameters: querystring.stringify(values)
};

var urlOut = "https://byui-lti-to-url.azurewebsites.net/Home/getScrambled?";
urlOut += querystring.stringify(secondValues).replace(/%2F/g,'/');

console.log(urlOut);