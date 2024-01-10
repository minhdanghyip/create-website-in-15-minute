(async function(){
 //Chú ý, script này được viết và chạy trên samsung S9.
	
    async function UploadTikTokVideo() {
        const videoDir = "F:\\videos"; //Thay đường dẫn thành đường dẫn của bạn.
        
        const videos = ReadDir(videoDir).filter(f => f.endsWith(".mp4"));
        if(!videos.length) {
            Log("No video!");
            await Delay(1000);
            return;
        }
        const randomVideo = RandomArray(videos);
        
        Log("Pusing video", randomVideo);
        await ExecAdbCmd("push", `${videoDir}\\${randomVideo}`, "/sdcard/DCIM/100ANDRO/" + randomVideo);
        await ExecShell("am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/DCIM/100ANDRO/" + randomVideo);
        
        Log("Open tiktok");
        await CloseApp("com.zhiliaoapp.musically"); //reset
        await OpenApp("com.zhiliaoapp.musically");
        
        const checkColorForUploadButton = [
            {
                "x": 650,
                "y": 2686,
                "r": 32,
                "g": 213,
                "b": 236,
                "a": 255
            },
            {
                "x": 710,
                "y": 2686,
                "r": 22,
                "g": 24,
                "b": 35,
                "a": 255
            },
            {
                "x": 790,
                "y": 2686,
                "r": 250,
                "g": 45,
                "b": 108,
                "a": 255
            }
        ];
        while(!(await CheckColorConds("all", ...checkColorForUploadButton))) {
          Log("Wait for tiktok loaded");
          await Delay(2000);
        }
        
        Log("Click add video");
        await TapByCoordinates(710, 2686);
        await Delay(3000);
        Log("Click upload");
        await TapByCoordinates(1165, 2241);
        await Delay(3000);
        Log("Select video");
        await TapByCoordinates(252, 661);
        await Delay(3000);
        Log("Click next");
        await TapByCoordinates(1055, 2686);
        await Delay(3000);
        Log("Click post");
        await TapByCoordinates(1055, 2686);
        
        
        Log("Delete video from device");
        await ExecShell("rm -f /sdcard/DCIM/100ANDRO/" + randomVideo);
        await ExecShell("am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file:///sdcard/DCIM/100ANDRO/" + randomVideo);
        Log("Move used video on computer");
        MkDir(`${videoDir}\\used`);
        MoveFile(`${videoDir}\\${randomVideo}`, `${videoDir}\\used\\${randomVideo}`);
        Log("Done");
    }
    
    //upload 1 video
    await UploadTikTokVideo();
    
    // for(let i = 0; i < 10; i++) { //neu muon lap lai 10 lan thi dung code nay
    //     await UploadTikTokVideo();
    // }
})();
