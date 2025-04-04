
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { subscribeToPlan } from '@/services/stripe';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Subscriptions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingSubscription, setLoadingSubscription] = React.useState<string | null>(null);
  
  const subscriptions = [
    {
      id: 'basic',
      name: 'Abonnement Basic',
      price: 9.90,
      period: 'mois',
      description: 'Pour une utilisation occasionnelle',
      features: [
        '2 locations gratuites par mois',
        'Tarif préférentiel: 1 CHF/heure',
        'Support par email'
      ],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Abonnement Premium',
      price: 19.90,
      period: 'mois',
      description: 'Pour une utilisation régulière',
      features: [
        '5 locations gratuites par mois',
        'Tarif préférentiel: 0.80 CHF/heure',
        'Support prioritaire',
        'Réservation de powerbank'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Abonnement Entreprise',
      price: 49.90,
      period: 'mois',
      description: 'Pour les équipes et entreprises',
      features: [
        'Locations illimitées par mois',
        'Tarif fixe: 0.50 CHF/heure',
        'Support dédié 24/7',
        'Facturation mensuelle',
        'Powerbanks personnalisées'
      ],
      recommended: false
    }
  ];

  const handleSubscribe = async (id: string) => {
    if (!user) {
      toast('Vous devez être connecté pour souscrire à un abonnement.');
      navigate('/account');
      return;
    }
    
    setLoadingSubscription(id);
    
    try {
      const result = await subscribeToPlan(id);
      // If success is true, the user will be redirected to the Stripe checkout page
      // If not, an error toast is displayed by the subscribeToPlan function
      if (!result.success) {
        setLoadingSubscription(null);
      }
    } catch (error) {
      setLoadingSubscription(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nos Abonnements</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choisissez l'abonnement qui correspond à vos besoins de location de powerbanks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {subscriptions.map((subscription) => (
              <Card 
                key={subscription.id} 
                className={`flex flex-col ${
                  subscription.recommended ? 'border-primary shadow-lg relative' : ''
                }`}
              >
                {subscription.recommended && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium flex items-center gap-1">
                    <Star size={14} />
                    Recommandé
                  </div>
                )}
                <CardHeader className={`${subscription.recommended ? 'pt-8' : ''}`}>
                  <CardTitle>{subscription.name}</CardTitle>
                  <CardDescription>{subscription.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <p className="text-3xl font-bold">{subscription.price} CHF</p>
                    <p className="text-muted-foreground">par {subscription.period}</p>
                  </div>
                  <ul className="space-y-2">
                    {subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={18} className="text-primary mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSubscribe(subscription.id)} 
                    variant={subscription.recommended ? 'default' : 'outline'} 
                    className="w-full"
                    disabled={loadingSubscription === subscription.id}
                  >
                    {loadingSubscription === subscription.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      'Souscrire'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-muted p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Questions Fréquentes</h2>
            <div className="grid gap-6 max-w-3xl mx-auto">
              <div>
                <h3 className="font-semibold text-lg mb-2">Comment fonctionne l'abonnement ?</h3>
                <p className="text-muted-foreground">Votre abonnement vous donne accès à notre réseau de powerbanks à un tarif préférentiel, ainsi qu'à un certain nombre de locations gratuites par mois selon la formule choisie.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Puis-je changer d'abonnement ?</h3>
                <p className="text-muted-foreground">Vous pouvez changer d'abonnement à tout moment. Le changement prendra effet à la prochaine période de facturation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Comment se passe la facturation ?</h3>
                <p className="text-muted-foreground">Votre abonnement est facturé mensuellement. Vous recevrez une facture par email avec le détail de vos locations et le montant prélevé.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Comment résilier mon abonnement ?</h3>
                <p className="text-muted-foreground">Vous pouvez résilier votre abonnement à tout moment depuis votre espace client. La résiliation prendra effet à la fin de la période en cours.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subscriptions;
