alert(this.props)

var FingerprintSdkTest = (function () {
    function FingerprintSdkTest() {
        var _instance = this;
        this.operationToRestart = null;
        this.acquisitionStarted = false;
        this.sdk = new Fingerprint.WebApi;
        this.sdk.onDeviceConnected = function (e) {
            // Detects if the deveice is connected for which acquisition started         
            showMessage("Scan your finger");
            showRegMessage("Scan your finger");
        };
        this.sdk.onDeviceDisconnected = function (e) {
            // Detects if device gets disconnected - provides deviceUid of disconnected device
            showMessage("Device disconnected");
            showRegMessage("Device disconnected");
        };
        this.sdk.onCommunicationFailed = function (e) {
            // Detects if there is a failure in communicating with U.R.U web SDK
            showMessage("Communinication Failed")
            showRegMessage("Device disconnected");
        };
        this.sdk.onSamplesAcquired = function (s) {
            // Sample acquired event triggers this function
            sampleAcquired(s);
        };
        this.sdk.onQualityReported = function (e) {
            // Quality of sample aquired - Function triggered on every sample acquired
            document.getElementById("qualityInputBox").value = Fingerprint.QualityCode[(e.quality)];
        }

    }
    FingerprintSdkTest.prototype.startCapture = function () {
        this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(function () {
            console.log("You can start capturing !!!");
            showMessage("You can start capturing !!!");
        }, function (error) {
            console.log(error.message);
            showMessage(error.message);
        });
    };

    FingerprintSdkTest.prototype.stopCapture = function () {
        this.sdk.stopAcquisition().then(function () {
            showMessage("Capturing stopped !!!");
        }, function (error) {
            showMessage(error.message);
        });
    }

    FingerprintSdkTest.prototype.startRegCapture = function () {
        this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(function () {
            console.log("You can start capturing !!!");
            showRegMessage("You can start capturing !!!");
        }, function (error) {
            console.log(error.message);
            showRegMessage(error.message);
        });
    };

    FingerprintSdkTest.prototype.stopRegCapture = function () {
        this.sdk.stopAcquisition().then(function () {
            showRegMessage("Capturing stopped !!!");
        }, function (error) {
            showRegMessage(error.message);
        });
    };

    return FingerprintSdkTest;
})();

function sampleAcquired(s) {
    if (currentFormat == Fingerprint.SampleFormat.PngImage) {
        // If sample acquired format is PNG- perform following call on object recieved 
        // Get samples from the object - get 0th element of samples as base 64 encoded PNG image         
        localStorage.setItem("imageSrc", "");
        var samples = JSON.parse(s.samples);
        localStorage.setItem("imageSrc", "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
        if (localStorage.getItem("imageSrc") == "" || localStorage.getItem("imageSrc") == null) {
            alert("Error -> Fingerprint not available");
        } else {
            var vDiv = document.getElementById('imagediv');
            vDiv.innerHTML = "";
            var image = document.createElement("img");
            image.id = "fingerprintimage";
            image.src = localStorage.getItem("imageSrc");
            vDiv.appendChild(image);
        }
    }
}

//########################## finger print for verification ###########
function showMessage(message) {
    var x = document.getElementById("fgpstatus");
    if (x !== null) {
        x.innerHTML = message;
        if (message === 'Communinication Failed') {
            x.className = "text-center text-danger";
        } else if (message === 'Device is not connected') {
            x.className = "text-center text-danger";
        } else if (message === 'Scan your finger') {
            x.className = "text-center text-success";
        } else if (message === 'Communication failure.') {
            x.className = "text-center text-danger";
        }
    }
};





var toogle_vrf_status = document.getElementById("fgpstatus");
var startcapture = document.getElementById('startcapture');
var capturefgp = document.getElementById('capturefgp');
var off = document.getElementById('stopcapture');
startcapture.addEventListener('click', beginCapture);

if (capturefgp !== undefined && capturefgp !== null) {
    capturefgp.addEventListener('click', getCapture);
};
if (off !== undefined && off !== null) {
    off.addEventListener('click', endCapture);
};






function beginCapture() {
    test = new FingerprintSdkTest();
    test.startCapture();
    toogle_vrf_status.style = 'display: block';
    document.getElementById('startcap').className = "d-none";
    document.getElementById('capfgp').className = 'd-block';
    // document.getElementById('btnmsg').className = 'font-weight-bold text-info';

};




function getCapture() {
    window.location
    // toogle_reg_status.style = 'display: none';
    toogle_vrf_status.style = 'display: block';
    var img_fetch = document.getElementById('fingerprintimage');
    if (img_fetch !== null && img_fetch !== undefined) {
        document.getElementById('Scaned_finger_print_input').value = img_fetch.src
        var capture_checker = document.getElementById('capture_checker');
        capture_checker.innerHTML = "";
        var image = document.createElement("img");
        image.id = "fingerprintimage";
        image.src = localStorage.getItem("imageSrc");
        capture_checker.style = 'display: block;';
        capture_checker.appendChild(image);
        showMessage("Sample Acquired")

        document.getElementById('startcap').className = "d-none";
        document.getElementById('capfgp').className = 'd-none';
        document.getElementById('stopcapture').className = "d-block";

    }
};




function endCapture() {
    test = new FingerprintSdkTest();
    test.stopCapture();
    // toogle_reg_status.style = 'display: none';
    toogle_vrf_status.style = 'display: block';
    var imginplacechecker = document.getElementById("Scaned_finger_print_input").value
    if (imginplacechecker !== null && imginplacechecker !== undefined && imginplacechecker !== "") {
        fpvrfbtn.className = 'd-block';
    }
    document.getElementById('startcap').className = "d-block";
    document.getElementById('capfgp').className = 'd-none';
    document.getElementById('stopcapture').className = "d-none";

};

