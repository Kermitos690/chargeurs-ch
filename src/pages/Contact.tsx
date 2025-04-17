
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast.success('Votre message a été envoyé avec succès !');
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'envoi de votre message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-green-50 py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-6">Contactez-nous</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Vous avez des questions ou besoin d'assistance ? Notre équipe est là pour vous aider.
                Remplissez le formulaire ci-dessous ou utilisez nos coordonnées directes.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Infos de contact */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1">Adresse</h3>
                          <p className="text-muted-foreground">
                            123 Rue de la Batterie<br />
                            1003 Lausanne<br />
                            Suisse
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1">Téléphone</h3>
                          <p className="text-muted-foreground">+41 21 123 45 67</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Lundi au vendredi: 9h-18h
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-muted-foreground">info@chargeurs.ch</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Nous répondons généralement sous 24h
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1">Heures d'ouverture</h3>
                          <div className="text-muted-foreground space-y-1">
                            <div className="flex justify-between">
                              <span>Lundi - Vendredi</span>
                              <span>9:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Samedi</span>
                              <span>10:00 - 16:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Dimanche</span>
                              <span>Fermé</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Formulaire de contact */}
              <div className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Envoyez-nous un message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Votre nom" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="votre.email@exemple.com" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Select onValueChange={handleSelectChange} value={formData.subject}>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Sélectionnez un sujet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="support">Assistance technique</SelectItem>
                            <SelectItem value="billing">Facturation</SelectItem>
                            <SelectItem value="partnership">Partenariat</SelectItem>
                            <SelectItem value="feedback">Commentaires</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          placeholder="Comment pouvons-nous vous aider ?" 
                          rows={6} 
                          required 
                        />
                      </div>
                      
                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                          <>Envoi en cours...</>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8">
          <div className="container px-4 mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden border">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43909.937508502686!2d6.617165761977534!3d46.52025380108751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c2e35b2e76b4d%3A0x9059ca0ca1ceb893!2sLausanne!5e0!3m2!1sfr!2sch!4v1650542138675!5m2!1sfr!2sch" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Notre emplacement"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Comment puis-je signaler un problème avec une powerbank ?</h3>
                    <p className="text-muted-foreground">
                      Vous pouvez nous contacter par téléphone au +41 21 123 45 67 ou par email à support@chargeurs.ch.
                      Vous pouvez également utiliser la fonction "Signaler un problème" dans notre application mobile.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Puis-je proposer l'installation d'une station dans mon établissement ?</h3>
                    <p className="text-muted-foreground">
                      Absolument ! Nous sommes toujours à la recherche de nouveaux partenaires. Contactez-nous 
                      via le formulaire ci-dessus en sélectionnant "Partenariat" comme sujet pour discuter des possibilités.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Comment fonctionne le remboursement en cas de problème ?</h3>
                    <p className="text-muted-foreground">
                      Si vous rencontrez un problème avec notre service, contactez notre support client dans 
                      les 24 heures. Après vérification, nous procéderons au remboursement approprié directement 
                      sur votre carte de paiement.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => window.location.href = '/faq'}>
                  Voir toutes les FAQ
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
