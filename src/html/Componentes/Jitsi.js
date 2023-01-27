import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk"; //hay que instalar jitsi, darle npm i
import "bootstrap/dist/css/bootstrap.min.css";
// import { ScriptHTMLAttributes } from "react";
// import { JitsiMeetExternalApi } from "@jitsi/react-sdk/lib/types";


const Jitsi = () => {
  // window.close()
  return (
    <>
      <div id="jitsi-container" className="me-5 ms-5 mb-5" aria-hidden="true">


        <JitsiMeeting
          domain="meet.jit.si"
          roomName=""
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
          }}
          interfaceConfigOverwrite={
            {
            }
          }
          userInfo={{
            displayName: "Nombre",
          }}
          onApiReady={(externalApi) => {
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "640px";
          }}
        />
      </div>
    </>
  );
};

export default Jitsi