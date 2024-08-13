// PaymentForm.js
import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { orderService } from '../../../_services/order.service';
import './PaymentForm.css';

const PaymentForm = ({ userId, items, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (values) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: values.name,
        email: values.email,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    try {
      const paymentIntent = await stripe.confirmCardPayment(paymentMethod.id, {
        payment_method: paymentMethod.id,
      });

      if (paymentIntent.error) {
        console.error(paymentIntent.error);
        return;
      }

      const orderData = {
        userId,
        items,
        totalAmount,
        paymentStatus: 'succeeded',
      };

      await orderService.createOrder(userId, items, totalAmount, 'succeeded');

      // Redirection ou affichage de message de succès
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}>
        <Input placeholder="Nom" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Veuillez entrer votre email' }]}>
        <Input type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item label="Informations de la carte">
        <CardElement />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!stripe}>
          Payer {totalAmount} €
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
