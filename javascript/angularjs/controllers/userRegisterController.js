angular.module('EventPlanner').controller('RegistrationController', function ($filter, $location) {
    var controller = this;
    controller.proceed = true;
    controller.color = 'panel-default';
    controller.progressPercent = 0;
    controller.errorMessage = '';
    
    // Below regular expressions, used to validate password requirements. REFERENCE: Udacity Courses
    var CheckForSymbol = new RegExp(/[\!\@\#\$\%\^\&\*]/g);
    var CheckNumber = new RegExp(/\d/g);
    var CheckLowerCaseLetter = new RegExp(/[a-z]/g);
    var CheckUpperCaseLetter = new RegExp(/[A-Z]/g);
    var CheckNotAllowedCharacter = new RegExp(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
    // Below regular expression, used to validate an email address. REFERENCE: http://emailregex.com/
    var CheckemailValidation = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

    // Below function, used to validate if all required inputs are valid if yes enable the submit button otherwise disable it.
    controller.validationProcess = function () {
        var resultPassed = false;
        var resultPassedfName = controller.checkRequiredField(controller.fname);
        var resultPassedlName = controller.checkRequiredField(controller.lname);
        var resultPassedEmail = controller.checkRequiredField(controller.email, false, true);
        var resultPassedPassword = controller.checkRequiredField(controller.password, true);
        if (resultPassedfName && resultPassedlName && resultPassedEmail && resultPassedPassword) {
            resultPassed = true;
        } else {
            resultPassed = false;
        }
        if (!resultPassed) {
            controller.color = 'panel-warning';
            controller.proceed = true;
        } else {
            controller.color = 'panel-success';
            controller.proceed = false;
        }
    };

    // Below function, used to increase or decrease the progress bar based on user input
    controller.checkProgressBar = function (event, isPassword, isEmail) {
        var currentValue = event.target.value;
        var currentValueLength = event.target.value.length;
        var detectPreviousProgress = event.target.getAttribute('data-changed') === null;
        var AllowedToPass = true;
        if (isPassword) {
            AllowedToPass = false;
            var checkResult = checkPassword(currentValue);
            AllowedToPass = checkResult.validity;
            var listofErrors = checkResult.message.split('ahmadSplit');
            listofErrors = listofErrors.slice(0, -1);
            controller.errorMessage = listofErrors;
            controlError(detectPreviousProgress, AllowedToPass, event, true, '');
        } else if (isEmail) {
            AllowedToPass = false;
            AllowedToPass = checkEmail(currentValue);
            controlError(detectPreviousProgress, AllowedToPass, event, true, '');
        } else {
            AllowedToPass = true;
        }
        if (currentValueLength !== 0 && detectPreviousProgress && AllowedToPass) {
            controller.progressPercent += 25;
            ErrorOccured(event, false);
        }
        controlError(detectPreviousProgress, AllowedToPass, event, false, currentValueLength);
    };

    // Below function, used to check the validation of the inputs
    controller.checkRequiredField = function (controllerName, isPassword, isEmail) {
        if (typeof (controllerName) !== 'undefined') {
            if (isPassword) {
                return checkPassword(controllerName).validity;
            }
            if (isEmail) {
                return checkEmail(controllerName);
            }
            return true;
        } else {
            return false;
        }
    };

    var controlError = function (detectPreviousProgress, AllowedToPass, event, isEmailOrPassword, currentValueLength) {
        if (isEmailOrPassword) {
            if (!detectPreviousProgress && !AllowedToPass) {
                controller.progressPercent -= 25;
                ErrorOccured(event, true);
            }
        } else {
            if (currentValueLength === 0 && !detectPreviousProgress && AllowedToPass) {
                controller.progressPercent -= 25;
                ErrorOccured(event, true);
            }
        }

    };

    var checkEmail = function (currentValue) {
        if (!currentValue.match(CheckemailValidation)) {
            return false;
        } else {
            return true;
        }
    };

    var checkPassword = function (currentValue) {
        var message = '';
        var allowedPassword = true;
        if (currentValue.length < 8) {
            allowedPassword =  false;
            message +='less than 8 characters ahmadSplit';
        } 
        if (!currentValue.match(CheckForSymbol)) {
         allowedPassword =  false;
         message +='missing a symbol (!, @, #, $, %, ^, &, *) ahmadSplit';
        } 
        if (!currentValue.match(CheckNumber)) {
            allowedPassword =  false;
         message +='missing a number ahmadSplit';
        } 
        if (!currentValue.match(CheckLowerCaseLetter)) {
           allowedPassword =  false;
         message +='missing an lowercase letter:';
        } 
        if (!currentValue.match(CheckUpperCaseLetter)) {
            allowedPassword =  false;
         message +='missing an uppercase letter ahmadSplit';
        } 
        var illegalCharacterGroup  = currentValue.match(CheckNotAllowedCharacter);
        if (illegalCharacterGroup) {
            illegalCharacterGroup.forEach(function(illegalChar){
                message +='includes illegal character: ' + illegalChar + 'ahmadSplit';
            });
            allowedPassword =  false;         
        } 
        if (allowedPassword) {
            allowedPassword =  true;
        }

        return {'validity': allowedPassword, 'message': message};
    };

    var ErrorOccured = function (event, error) {
        var spans = [];
        var listofchilde = event.target.parentElement.children;
        for (var i = 0; i < listofchilde.length; i++) {
            if (listofchilde[i].nodeName === 'SPAN') {
                spans.push(i);
            }
        }
        if (error) {
            event.target.parentElement.classList.remove('has-success');
            event.target.parentElement.classList.add('has-error');
            event.target.parentElement.children[spans[0]].classList.remove('glyphicon-ok');
            event.target.parentElement.children[spans[0]].classList.add('glyphicon-remove');
            event.target.parentElement.children[spans[1]].innerHTML = '(error)';
            event.target.removeAttribute('data-changed');
        } else {
            event.target.parentElement.classList.add('has-success');
            event.target.parentElement.classList.remove('has-error');
            event.target.parentElement.children[spans[0]].classList.add('glyphicon-ok');
            event.target.parentElement.children[spans[0]].classList.remove('glyphicon-remove');
            event.target.parentElement.children[spans[1]].innerHTML = '(success)';
            event.target.setAttribute('data-changed', 'yes');
        }
    };

    controller.addUser = function () {
        var jsondata;
        if(localStorage.getItem('EventPlanerDB')) {
            jsondata = JSON.parse(localStorage.getItem('EventPlanerDB'));
        }else{
            jsondata = {'users': [],'events': [], 'loggedInUser':''};
        }
        var newuser = '{"firstName":"' + controller.fname + '",' +
        '"lastName":"' + controller.lname + '",' +
        '"email":"' + controller.email + '",' +
        '"password":"' + controller.password + '",' +
        '"dateOfBirth":"' + (typeof(controller.dateOfBirth) === 'undefined' ? '' : controller.dateOfBirth ) + '",' +
        '"companyName":"' + (typeof(controller.companyName) === 'undefined' ? '' : controller.companyName ) + '",' +
        '"countryName":"' + (typeof(controller.countryName) === 'undefined' ? '' : controller.countryName )  + '",' +
        '"gender":"' + (typeof(controller.gender) === 'undefined' ? '' : controller.gender ) + '",' +
        '"biography":"' + (typeof(controller.biography) === 'undefined' ? '' : controller.biography ) +'"}';
        var existingEmail = [];
        for (var i = 0; i < jsondata.users.length; i++) {
            existingEmail.push(JSON.parse(jsondata.users[i]).email);
        }
        var userExist = $filter('filter')(existingEmail, controller.email);
        if (userExist.length > 0) {
            controller.ErroUserExist = controller.email + ' already exist !';
            controller.showError = true;
            $('html,body').animate({scrollTop:0},'slow');
        }
        else{
            controller.ErroUserExist = '';
            controller.showError = false;
            jsondata.users.push(newuser);
            jsondata.loggedInUser = controller.email;
            localStorage.setItem('EventPlanerDB',JSON.stringify(jsondata));
            $location.path('/home');
        }
    };
});