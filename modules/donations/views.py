from django.shortcuts import render
import stripe
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Donation

stripe.api_key = 'your_secret_key'

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Create a PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=int(data['amount']) * 100,  # Convert to cents
                currency='usd',
                metadata={'name': data['name'], 'email': data['email']}
            )
            # Save donation details
            Donation.objects.create(
                name=data['name'],
                email=data['email'],
                amount=data['amount']
            )
            return JsonResponse({'clientSecret': intent['client_secret']})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)