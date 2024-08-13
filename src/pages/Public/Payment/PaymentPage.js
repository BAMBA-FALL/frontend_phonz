import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { usePanier } from '../Panier/PanierContext';
import { orderService } from '../../../_services/order.service';
import './PaymentPage.css';

// Assurez-vous d'utiliser votre clé publique de test Stripe
const stripePromise = loadStripe('YOUR_PUBLIC_STRIPE_KEY');

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const { panier: cartItems, clearCart } = usePanier();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { name, address, email } = values;
      const userId = "yourUserId"; // Remplacez par l'ID de l'utilisateur approprié
      const totalAmount = cartItems.reduce((total, item) => total + item.produit.price * item.quantite, 0) * 100;

      // Obtenez le clientSecret du backend
      const { clientSecret } = await orderService.checkout();

      const cardElement = elements.getElement(CardElement);

      // Confirmez le paiement avec le clientSecret
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            address: {
              line1: address,
            },
            email,
          },
        },
      });

      if (confirmError) {
        message.error('Erreur lors de la confirmation du paiement: ' + confirmError.message);
        return;
      }

      // Enregistrez la commande uniquement si le paiement est réussi
      if (paymentIntent.status === 'succeeded') {
        await orderService.createOrder(userId, cartItems, totalAmount, 'pending');
        message.success('Commande réussie!');
        clearCart();
        navigate('/success');
      } else {
        message.error('Le paiement a échoué.');
      }
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      message.error('Erreur lors du traitement de votre commande.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Form
        name="payment"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nom"
          name="name"
          rules={[{ required: true, message: 'Veuillez entrer votre nom!' }]}
          className="formItem"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Adresse"
          name="address"
          rules={[{ required: true, message: 'Veuillez entrer votre adresse!' }]}
          className="formItem"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
          className="formItem"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Carte de Crédit"
          name="creditCard"
          rules={[{ required: true, message: 'Veuillez entrer votre carte de crédit!' }]}
          className="formItem"
        >
          <CardElement className="cardElement" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="buttonContainer">
          <Button type="primary" htmlType="submit" loading={loading} className="button">
            Payer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentPage;
