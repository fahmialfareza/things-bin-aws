/*global WildRydes _config*/

var ThingsBin = window.ThingsBin || {};
ThingsBin.map = ThingsBin.map || {};

(function rideScopeWrapper($) {
    var authToken;
    ThingsBin.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = 'login.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = 'login.html';
    });

    // Register click handler for #request button
    $(function onDocReady() {
        $('#signOut').click(function () {
            ThingsBin.signOut();
            alert("You have been signed out.");
            window.location = "login.html";
        });

        ThingsBin.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });
        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
