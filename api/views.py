# views.py
from django.db import Error
from django.http import JsonResponse
from django.shortcuts import HttpResponse
import json

from api.aggregate import aggregate, scrape
from .models import User, Url
from .serializers import UserSerializer, UrlSerializer


def index(request):
    return JsonResponse([{"title" : "ahhhh"},
						 {"title" : "323333"}], safe=False)

def get_summoner(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        response = aggregate.get_summoner(data.get('region'), data.get('name'))
        return response_handler(response) #userSerializer?


def get_matchlist(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        response = aggregate.get_matchlist(data.get('region'), data.get('accountId'))
        return response_handler(response) #matchlistSerializer?

def get_match(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        response = aggregate.get_match(data.get('region'), data.get('matchId'))
        return response_handler(response)

def get_opt_runes(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        response = scrape.get_opt_runes_for_champion(data.get('champion'), data.get('role'))
        return response_handler(response)

# def user(request):
#     if request.method == 'GET':
#         return JsonResponse({'data':UserSerializer(User.objects.all().order_by('id'),many=True).data})
#
#     if request.method == 'POST':
#         data = json.loads(request.body.decode())
#         user = User(user=data.get('user'),
#                     id=User.generate_id(),
#                     address=data.get('address'))
#         user.save()
#         return JsonResponse(UserSerializer(User.objects.get(id=user.id)).data)

def response_handler(response):
    if response['status']:
        return HttpResponse(reason=response['status'], status=response['status']['status_code'])
    return JsonResponse(response)