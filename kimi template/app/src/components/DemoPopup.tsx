import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface DemoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoPopup({ isOpen, onClose }: DemoPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md frosted-glass border-primary/20">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full gradient-blue flex items-center justify-center mb-4 animate-pulse-glow">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-amptech-dark">
            Ceci est une démo
          </DialogTitle>
          <DialogDescription className="text-amptech-gray-medium mt-2">
            Ce site web est une démonstration. Pour plus d'informations ou pour demander un devis, veuillez contacter Amptech Inc. directement.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 text-center">
          <Button 
            onClick={onClose}
            className="gradient-blue text-white hover:opacity-90 rounded-full px-8 py-2 electric-fill"
          >
            Compris
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
