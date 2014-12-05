var baseUrl = "http://www.opensecrets.org/api/?method=";

module.exports = {
    '/getLegislators': function (req) {
        return baseUrl + "getLegislators&id=" + req.query.state;
    },
    '/getContributors': function (req) {
        return baseUrl + "candContrib&cid=" + req.query.cid + "&cycle=2014";
    },
    '/getSummary': function (req) {
        return baseUrl + "candSummary&cid=" + req.query.cid + "&cycle=2014";
    },
    '/getIndustries': function (req) {
        return baseUrl + "candIndustry&cid=" + req.query.cid + "&cycle=2012";
    },
    '/getProfile': function (req) {
        return baseUrl + "memPFDprofile&year=2010&cid=" + req.query.cid;
    }
};