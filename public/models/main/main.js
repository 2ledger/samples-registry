var appT = angular.module('2ledger-sample-registry');

appT.controller('main', main)

function main($scope, $http, $rootScope, $timeout, $filter, ngTableParams, $location, $anchorScroll) {

    var me = this;

    me.passwordClient = '';
    me.emailClient = '';
    me.showWaiting = false;
    me.showWaitingBox = false;
    me.showOnknow = false;

    $('.alert').css({ 'margin-top': '-300px' });
    $('.boxClient').css({ 'margin-top': '-800px' });
    
    $('.cmpNotFound').css({ top: 1500 });
    $('.cmpRegister').css({ top: 1500 });
    $('.cmpDocument').css({ top: 1500 });
    $('.cmpSpinDrop').css({ display: 'none' });
    
    var qrcode = new QRCode("qrcode", { width: 80, height: 80, text: '' });
    
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var isAdvancedUpload = function () {
        var div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();

    if (isAdvancedUpload) {

        var droppedFiles = false;

        $('.boxUpload').on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
        })
            .on('dragover dragenter', function () {
                if (me.showWaiting)
                    return;

                $('.boxUpload').addClass('is-dragover');
            })
            .on('dragleave dragend drop', function () {
                if (me.showWaiting)
                    return;

                $('.boxUpload').removeClass('is-dragover');
            })
            .on('drop', function (e) {
                if (me.showWaiting || me.showWaitingBox)
                    return;

                $('.cmpSpinDrop').css({ display: 'block' });

                me.hideAll();

                var file = e.originalEvent.dataTransfer.files[0];
                var reader = new FileReader();

                me.filename = file.name;
                $scope.$apply();

                reader.onload = function (event) {
                    var binary = event.target.result;
                    me.generateHash(binary);
                };

                reader.readAsBinaryString(file);
            });
    }

    var onImageChange = function () {
        me.hideAll();

        $('.cmpSpinDrop').css({ display: 'block' });

        var file = $('.cmpUpload')[0].files[0];
        var reader = new FileReader();

        me.filename = file.name;
        $scope.$apply();

        reader.onload = function (event) {
            var binary = event.target.result;

            $(".cmpUpload").val('');

            me.generateHash(binary);
        };

        reader.readAsBinaryString(file);
    }

    me.onMouseDownUpload = function () {
        if (me.showWaiting || me.showWaitingBox)
            return;

        $('.cmpUpload')[0].addEventListener('change', onImageChange, false);
        $('.cmpUpload')[0].click();
    }

    me.generateHash = function (binary) {
        me.hash = CryptoJS.MD5(binary).toString();
        me.searchDocument();
    }

    me.cancelRegister = function () {
        me.filename = '';
        me.hideRegisterDocument();
    }

    me.showLoading = function (text) {
        me.loadingText = text;
        me.showWaiting = true;

        $('.loadingText').animate({ 'opacity': '0', 'margin-top': '40' }, 100, function () {
            $('.loadingText').animate({ 'opacity': '1', 'margin-top': '5' }, 100);
        });
    }

    me.searchDocument = function () {
        me.showWaitingPop = true;
        me.showWaitingBox = true;

        var rest = {
            method: 'POST',
            url: "searchDocument",
            headers: { 'Content-Type': 'application/json' },
            data: {
                document: me.hash
            }
        }

        $http(rest).then(function (e) {
            setTimeout(function () {
                me.showWaitingBox = false;
                me.showWaitingPop = false;
                $scope.$apply();

                if (e.data.type == 'error')
                    if (getParameterByName('hash')) {
                        setTimeout(function () {
                            me.showOnknow = true;
                            $scope.$apply();
                        }, 100);
                    }
                    else
                        me.showNotFound();
                else
                    me.showDocument(e.data.data)
                
                $('.cmpSpinDrop').css({ display: 'none' });

            }, 200);




        }, function (err) {
            me.showError(err.data.error_message);
            me.showWaitingBox = false;
            me.showWaitingPop = false;
            console.log(err);
        });
    }



    me.showNotFound = function () {
        $('.cmpNotFound').animate({ top: 0 });
    }

    me.hideNotFound = function () {
        $('.cmpNotFound').animate({ top: 1500 });
    }

    me.showRegisterDocument = function () {
        $('.cmpRegister').animate({ top: 0 });
    }

    me.hideRegisterDocument = function () {
        $('.cmpRegister').animate({ top: 1500 });
    }

    me.cancelNotFound = function () {
        me.filename = '';
        me.hideNotFound();
    }

    me.clearFields = function () {
        me.author = '';
        me.title = '';
        me.description = '';
    }

    me.showDocument = function (reg) {

        setTimeout(function () {
            me.author = reg.author;
            me.title = reg.title;
            me.description = reg.description;
            me.dateRegister = reg.dateRegister;

            $scope.$apply();

            setTimeout(function () {
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];                
                
                qrcode.makeCode(baseUrl + '#/main/' + me.hash);

                $scope.$apply();
            });

            $('.cmpDocument').animate({ top: 0 });

        }, 100)
    }

    me.hideDocument = function () {
        $('.cmpDocument').animate({ top: 1500 });
    }

    me.showAlert = function (text) {
        me.responseText = text;

        $('.alert').css({ 'margin-top': '-300px' });
        $('.alert').animate({ 'margin-top': '3px' }, 100);

        setTimeout(function () {
           me.hideAlert();
        }, 2000)

    }

    me.hideAlert = function (text) {
        $('.alert').animate({ 'margin-top': '-300px' }, 100);
    }

    me.addDocument = function () {

        me.showLoading('Registering document, Please wait');

        me.clients = [];
        var rest = {
            method: 'POST',
            url: "addDocument",
            headers: { 'Content-Type': 'application/json' },
            data: {
                id: me.hash,
                data: {
                    author: me.author,
                    title: me.title,
                    description: me.description
                }
            }
        }

        $http(rest).then(function (e) {
            me.hideAll()
            me.showDocument(e.data.value);
            me.showWaitingPop = false;
            me.showWaiting = false;

            me.showAlert('Document successfully registered');

        }, function (err) {
            me.showError(err.data.error_message);
            me.showWaiting = false;
            me.showWaitingPop = false;
            console.log(err);
        });

    }

    me.registerDocument = function () {
        me.clearFields();
        me.hideNotFound();
        me.showRegisterDocument();
    }

    me.hideAll = function () {
        me.hideNotFound();
        me.hideDocument();
        me.hideRegisterDocument();
    }


    me.getToken = function () {
        var rest = {
            method: 'GET',
            url: "getToken",
            headers: { 'Content-Type': 'application/json' },
        }

        $http(rest).then(function (e) {
        }, function (err) {
            me.showError(err.data.error_message);      
            console.log(err);
        });
    }

    if (getParameterByName('hash')) {
        me.hash = getParameterByName('hash');
        me.searchDocument();

        $('.cmpDocument').addClass('boxDocumentView');
        $('.cmpDetailsDoc').addClass('cmpDetailView');
        $('.formFields').removeClass('formMain');

        $('.cmpLogoDocument').css({ display: 'block' });
    }

    me.getToken();
}

