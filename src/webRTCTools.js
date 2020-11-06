export default class WebRTCTools {


static  getMyDivices(strForVoiceOrVideo,video,audio,clb){

    switch(strForVoiceOrVideo){
        case'v':
       return navigator.mediaDevices.getUserMedia({video:video||true,audio:false});
        case'a':
     return   navigator.mediaDevices.getUserMedia({video:false,audio:audio||true});
        case'av':
        case'va':
       return navigator.mediaDevices.getUserMedia({video:video||true,audio:audio||true});

        default: return new Error('you need to enter a string that contain a "v" for video || "a" for audio || "av" "va" for audio and video \n you can send a obj for how you want the video or the audio be ')

    }
    
}


}


