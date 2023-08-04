import { IonButton, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { scanOutline, closeCircleOutline, qrCodeOutline } from "ionicons/icons";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";

interface NativeBarcodeScannerProps {
  onScannedAddress: (address: string) => void;
}

const NativeBarcodeScanner: React.FC<NativeBarcodeScannerProps> = ({
  onScannedAddress,
}) => {
  const {
    barcodeScanner,
    startScan,
    checkPermission,
    stopScan,
    isOpened,
    BarcodeScannerInterface,
  } = useBarcodeScanner();

  //   checkPermission()
  return (
    <>
      {/* <button onClick={() => startScan()} className="scan">
        <IonIcon icon={qrCodeOutline} style={{ marginRight: "6px" }} />
        Scan Address
      </button> */}
      <button onClick={() => startScan()} className="scan-circle">
        <IonIcon icon={scanOutline} />
      </button>
      {isOpened && (
        <BarcodeScannerInterface>
          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton onClick={stopScan} color="light">
              <IonIcon icon={closeCircleOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </BarcodeScannerInterface>
      )}
      {barcodeScanner && onScannedAddress(barcodeScanner.content)}
    </>
  );
};

export default NativeBarcodeScanner;
