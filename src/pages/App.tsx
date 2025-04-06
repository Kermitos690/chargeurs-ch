
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, QrCode, CreditCard, Clock, Battery, MapPin } from 'lucide-react';
import { getUserProfile } from '@/services/supabase/profile';
import ScannerComponent from '@/components/app/ScannerComponent';
import PowerBankInfo from '@/components/app/PowerBankInfo';
import RentalPayment from '@/components/app/RentalPayment';

const AppPage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('scanner');
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [powerBankData, setPowerBankData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simuler la détection d'un code QR
  const handleCodeScanned = (code: string) => {
    setScannedCode(code);
    setIsScanning(false);
    toast.success(`Code scanné avec succès: ${code}`);
    
    // Simuler la récupération des données de la powerbank
    setIsLoading(true);
    setTimeout(() => {
      setPowerBankData({
        id: code,
        serialNumber: `PB-${code.substring(0, 6)}`,
        batteryLevel: Math.floor(Math.random() * 100),
        status: 'available',
        stationId: 'ST001',
        stationName: 'Café du Centre',
        price: 2.00,
        pricePerHour: 2.00
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleCodeScanned(manualCode.trim());
    } else {
      toast.error('Veuillez entrer un code valide');
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setPowerBankData(null);
    setScannedCode(null);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const resetScan = () => {
    setPowerBankData(null);
    setScannedCode(null);
    setManualCode('');
  };

  const handleRentalComplete = () => {
    toast.success('Location réussie! Vous pouvez maintenant utiliser votre powerbank.');
    resetScan();
    setActiveTab('scanner');
  };

  const handleReturnPowerBank = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Powerbank retournée avec succès!');
      resetScan();
      setIsLoading(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6">Porcher Chargeurs.ch</h1>
          <p className="text-center text-muted-foreground mb-8">
            Scannez, louez et retournez facilement vos powerbanks
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scanner">Scanner</TabsTrigger>
              <TabsTrigger value="mes-locations">Mes Locations</TabsTrigger>
              <TabsTrigger value="aide">Aide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scanner" className="mt-6">
              {!scannedCode ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode size={20} />
                      Scanner une Powerbank
                    </CardTitle>
                    <CardDescription>
                      Scannez le QR code sur la borne ou la powerbank
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isScanning ? (
                      <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-black">
                        <ScannerComponent 
                          onCodeScanned={handleCodeScanned}
                          onError={(error) => toast.error(`Erreur de scan: ${error}`)}
                        />
                        <Button 
                          variant="secondary" 
                          className="absolute bottom-4 right-4"
                          onClick={stopScanning}
                        >
                          Annuler
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="w-full py-8 text-lg" 
                        onClick={startScanning}
                      >
                        <QrCode className="mr-2" /> Démarrer le scan
                      </Button>
                    )}
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Ou entrez le code manuellement
                        </span>
                      </div>
                    </div>
                    
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <Input
                        placeholder="Entrez le code de la powerbank"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                      />
                      <Button type="submit" className="w-full">Valider</Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {isLoading ? (
                    <Card className="text-center p-6">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                        <p>Recherche des informations...</p>
                      </div>
                    </Card>
                  ) : (
                    <>
                      {powerBankData && (
                        <div className="space-y-4">
                          <PowerBankInfo powerBank={powerBankData} />
                          <RentalPayment 
                            powerBank={powerBankData} 
                            onComplete={handleRentalComplete} 
                            onCancel={resetScan}
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="mes-locations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Locations Actives</CardTitle>
                  <CardDescription>
                    Gérez vos locations de powerbanks en cours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Pour l'exemple, nous affichons une location fictive */}
                  <div className="space-y-4">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">
                            <Battery className="inline mr-2" />
                            Powerbank #PB12345
                          </CardTitle>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Active
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Début</p>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              <span>Aujourd'hui, 14:32</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Lieu de prise</p>
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              <span>Café du Centre</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-muted-foreground">Durée</p>
                          <p className="font-medium">2h 15min</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-muted-foreground">Coût actuel</p>
                          <p className="font-medium">4.50 CHF</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={handleReturnPowerBank}
                          variant="secondary"
                        >
                          Retourner cette powerbank
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="aide" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Comment ça marche ?</CardTitle>
                  <CardDescription>
                    Guide d'utilisation du service de powerbanks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">1. Louer une powerbank</h3>
                    <p className="text-sm text-muted-foreground">
                      Scannez le QR code sur la borne ou la powerbank, ou entrez le code manuellement.
                      Confirmez la location et effectuez le paiement si nécessaire.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">2. Utiliser la powerbank</h3>
                    <p className="text-sm text-muted-foreground">
                      Utilisez la powerbank aussi longtemps que nécessaire. Le tarif est de 2 CHF par heure.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">3. Retourner la powerbank</h3>
                    <p className="text-sm text-muted-foreground">
                      Retournez la powerbank à n'importe quelle borne Chargeurs.ch. Scannez la powerbank et 
                      placez-la dans un emplacement disponible.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Besoin d'aide ?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contactez notre service client pour toute question ou problème.
                    </p>
                    <Button className="w-full">Contacter le support</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppPage;
