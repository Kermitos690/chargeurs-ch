
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface ScannerComponentProps {
  onCodeScanned: (code: string) => void;
  onError?: (error: string) => void;
}

const ScannerComponent: React.FC<ScannerComponentProps> = ({ onCodeScanned, onError }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "qr-reader";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (scannerRef.current) {
        scannerRef.current.stop().catch(error => {
          console.error("Failed to stop scanner:", error);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const startScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode(scannerContainerId);
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onCodeScanned(decodedText);
            html5QrCode.stop().catch(error => {
              console.error("Failed to stop scanner after successful scan:", error);
            });
          },
          (errorMessage) => {
            // Ne pas afficher les erreurs de scan en cours, seulement les erreurs graves
            if (errorMessage.includes("Camera access denied")) {
              onError && onError("Accès à la caméra refusé. Veuillez autoriser l'accès à la caméra.");
              html5QrCode.stop().catch(error => {
                console.error("Failed to stop scanner after error:", error);
              });
            }
          }
        ).catch((err) => {
          onError && onError(`Impossible d'initialiser le scanner: ${err.message || err}`);
        });
      } catch (error: any) {
        onError && onError(`Erreur lors de l'initialisation du scanner: ${error.message || error}`);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(error => {
          console.error("Failed to stop scanner on cleanup:", error);
        });
      }
    };
  }, [isMounted, onCodeScanned, onError]);

  return <div id={scannerContainerId} className="w-full h-full"></div>;
};

export default ScannerComponent;
