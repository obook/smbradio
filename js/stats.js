/*
 * 
 {
  "currentlisteners": 1,
  "peaklisteners": 3,
  "maxlisteners": 200,
  "uniquelisteners": 1,
  "averagetime": 37,
  "servergenre": "Education",
  "servergenre2": "",
  "servergenre3": "",
  "servergenre4": "",
  "servergenre5": "",
  "serverurl": "https://www.smb33.fr/",
  "servertitle": "SMB Star Radio",
  "songtitle": "Neffex - Ready to kill",
  "streamhits": 169,
  "streamstatus": 1,
  "backupstatus": 0,
  "streamlisted": 0,
  "streamlistederror": 9,
  "streampath": "/",
  "streamuptime": 235845,
  "bitrate": "128",
  "samplerate": "44100",
  "content": "audio/mpeg",
  "version": "2.6.1.777 (posix(linux x86))"
}

 * */

GetStats();

setInterval(GetStats, 20000);

function GetStats() {
var server_url = 'https://s44.myradiostream.com:8814/stats?json=1';

        jQuery.ajax({
            url: server_url,
            dataType: 'jsonp',
            type: "GET",
            success: function(result, status, xhr)
            {
              $('#songtitle').text(result.songtitle);
              $('#pgmtitle').html("SMB ST&#11088;R [" + result.currentlisteners+"]");
            },
            error: function(jqXHR, text, errorThrown)
            {
              console.log("GetStats ERROR : "+jqXHR.status);
              console.log("GetStats ERROR : "+errorThrown);
            }
        });
}
