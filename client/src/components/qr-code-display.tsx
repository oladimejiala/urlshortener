import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateQRCode, downloadQRCode } from "@/lib/qr-generator";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDisplayProps {
  url: string;
  shortCode: string;
}

export function QRCodeDisplay({ url, shortCode }: QRCodeDisplayProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const generateCode = async () => {
      try {
        setIsLoading(true);
        const dataUrl = await generateQRCode(`https://${url}`);
        setQrCodeUrl(dataUrl);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate QR code",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateCode();
  }, [url, toast]);

  const handleDownload = () => {
    if (qrCodeUrl) {
      downloadQRCode(qrCodeUrl, `qr-code-${shortCode}.png`);
      toast({
        title: "Success",
        description: "QR code downloaded successfully",
      });
    }
  };

  return (
    <div className="text-center">
      <h4 className="font-semibold text-gray-900 mb-3">QR Code</h4>
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
        {isLoading ? (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt="QR Code for shortened URL"
            className="w-32 h-32 mx-auto"
            data-testid="img-qr-code"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded text-gray-500">
            Failed to load
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownload}
        disabled={!qrCodeUrl}
        className="mt-3 text-blue-500 hover:text-blue-600"
        data-testid="button-download-qr"
      >
        <Download className="h-4 w-4 mr-1" />
        Download QR Code
      </Button>
    </div>
  );
}
