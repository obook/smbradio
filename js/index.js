/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

console.log("Bonjour");


var theAPP = {
    testing_on_desktop: true,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log('theAPP.bindEvents'); 
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        console.log('theAPP.onDeviceReady'); 
        theAPP.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /* here : mode = cordova only */
        console.log('theAPP.receivedEvent Event: ' + id);
        this.loadScripts();
    },
    loadScript: function (url, callback) {
        console.log('theAPP.loadScript: ' + url);
        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
};

theAPP.initialize();

    // Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.debug('RADIOSMB: Running cordova-' + cordova.platformId + '@' + cordova.version);
    
}



    
const currentplayer = document.getElementById('controlaudio');



    const message = document.getElementById('urltitle');
    const urlinfo = document.getElementById('urlinfo');
    urlinfo.disabled = true;
    
    var url ='https://s44.myradiostream.com/8814/listen.mp3';
    
    
    // currentplayer.addEventListener("play", IsPlaying, false);
    // currentplayer.addEventListener("MozAudioAvailable", IsPlaying, false);
    currentplayer.onplay = (event) => {
        console.log(
            "(event) = currentplayer.onplay",
        );
    };
    
    var last_currentTime = 0;
    var toogle = 0;
    var msg_lecture=["LECTURE EN COURS", "LECTURE EN COURS .", "LECTURE EN COURS ..","LECTURE EN COURS ..."];
                
    function MyTimer() 
    {
        if( !currentplayer.paused && currentplayer.currentTime != last_currentTime ) // Playing
        {
            last_currentTime = currentplayer.currentTime;
            message.innerText=msg_lecture[toogle];
            toogle++;
            if( toogle>3)
                toogle = 0;
            
        }
        else
        {
            message.innerText="EN PAUSE";
        }
    }

    setInterval(MyTimer, 1000);
    
    if( !window.isCordovaApp ) /* Si ce n'est pas une application du téléphone */
    {
        url ='http://s44.myradiostream.com:8814/;stream.nsv';;
    }

    LoadURL(url);
    /*
    var choix = document.querySelector("#ComboStreams");
    choix.addEventListener("change", function() {
    var select = this.value;
    LoadURL(select);
    
    });
    */
function IsPlaying()
{
    title = currentplayer.getAttribute("data-audio");

    channels          = currentplayer.mozChannels;
    rate              = currentplayer.mozSampleRate;
    frameBufferLength = currentplayer.mozFrameBufferLength;

    console.log("IS PLAYING : "+title+channels+rate+frameBufferLength);
}

function PlayStream()
{
    console.log("RADIOSMB33 : PlayStream " + url);
                    toast("Recherche ...");
    let startPlayPromise = currentplayer.play();
}

function PauseStream()
{
    console.log("RADIOSMB33 : PauseStream " + url);
    currentplayer.pause();
}

function exitFromApp()
{
    /* navigator.notification.beep(2); */
    console.log("RADIOSMB33 : exitFromApp");
    PauseStream();
    if( window.isCordovaApp == true )
        navigator.app.exitApp();
}

function LoadURL(stream)
{
    url = stream;
    currentplayer.src = url;
    urlinfo.value = url;
    message.innerText="CHARGEMENT EN COURS ...";
    PlayStream();
}

currentplayer.addEventListener('error', function failed(e) {
    // audio playback failed - show a message saying why
    // to get the source of the audio element use $(this).src
    switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
        var m = 'You aborted the video playback.';
        toast(m);
        console.log(m);
        break;
        case e.target.error.MEDIA_ERR_NETWORK:
        var m = 'A network error caused the audio download to fail.';
        toast(m);
        console.log(m);
        break;
        case e.target.error.MEDIA_ERR_DECODE:
        var m = 'The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.';
        toast(m);
        console.log(m);
        break;
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        var m = 'The video audio not be loaded, either because the server or network failed or because the format is not supported.';
        toast(m);
        console.log(m);
        break;
        default:
        var m = 'An unknown error occurred.';
        toast(m);
        console.log(m);
    break;
    }
}, true);

function Info()
{
    toast("&#169; O.Booklage 2023");
}
            
