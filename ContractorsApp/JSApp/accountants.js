 
/// <reference path="../jquery-2.1.4.min.js" />
/// <reference path="../jquery-ui.js" />
/// <reference path="../bootstrap.min.js" />
/// <reference path="../spin.min.js" /> 
/// <reference path="../knockout-3.1.0.js" />
/// <reference path="../knockout.validation.js" />

var Model = function () {
    var self = this;
    self.accountants = ko.observableArray([]);
    self.changeStatus = ko.observable(false);
    self.currentId = ko.observable();
    self.Edit = function (obj, event) {
        alert('Id is ' + obj.id);
    };

};

var accountant = function () {
    var self = this;
    self.id = ko.observable();
    self.fullname = ko.observable();
    self.address = ko.observable();
    self.socialCardNumber = ko.observable();
    self.phone = ko.observable();
    self.email = ko.observable();
};

var createAccountant = function (data) {
    var _obj = new accountant();

    _obj.id(data.id);
    _obj.fullname(data.fullname);
    _obj.address(data.address);
    _obj.phone(data.phone);
    _obj.socialCardNumber(data.socialCardNumber);
    _obj.email(data.email);

    return _obj;
};

var getAccountants = function () {

    $.get("../../Accontants/GetAllRecords", OnGetSuccess);

    var opts = {
        lines: 17, // The number of lines to draw
        length: 33, // The length of each line
        width: 4, // The line thickness
        radius: 41, // The radius of the inner circle
        corners: 0.8, // Corner roundness (0..1)
        rotate: 45, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 10, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };

    var target = document.getElementById('viewcontent');

    spinner = new Spinner(opts).spin(target);

};

var OnGetSuccess = function (data) {
    var result = JSON.parse(data);

    result.forEach(function (obj) {
        ModelInstance.accountants.push(createAccountant(obj));
    });

    ko.applyBindings(ModelInstance);

    spinner.stop();
};

var ModelInstance = new Model();

$(document).ready(function () {
    getAccountants();
});
