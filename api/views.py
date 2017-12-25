# views.py
from django.db import Error
from django.http import JsonResponse
from django.shortcuts import HttpResponse
import json

from rest_framework.decorators import api_view

from api.aggregate import aggregate, scrape, rune
from api.aggregate.aggregate import serialize_match
from .models import User, Url
from .serializers import UserSerializer, UrlSerializer

@api_view(['GET'])
def index(request):
    return JsonResponse([{"title" : "ahhhh"},
						 {"title" : "323333"}], safe=False)

@api_view(['POST'])
def get_summoner(request):
    response = aggregate.get_summoner(request.POST.get('region'), request.POST.get('name'))
    return response_handler(response) #userSerializer?

@api_view(['POST'])
def get_matchlist(request):
    response = aggregate.get_matchlist(request.POST.get('region'), request.POST.get('accountId'))
    return response_handler(response) #matchlistSerializer?

@api_view(['POST'])
def get_match(request):
    response = aggregate.get_match(request.POST.get('region'), request.POST.get('matchId'))
    match = serialize_match(request.POST.get('accountId'), response)
    return response_handler(match)

@api_view(['POST'])
def get_popular_runes_for_champion(request):
    response = rune.get_popular_runes_for_champ(request.POST.get('champion'), request.POST.get('role'))
    response = serialize_match(response)
    return response_handler(response)

@api_view(['POST'])
def get_rune_info(request):
    rune_info = rune.get_rune_info(request.POST.get('rune'))
    return response_handler(rune_info)

def response_handler(response):
    if 'status' in response:
        return HttpResponse(reason=response['status'], status=response['status']['status_code'])
    if isinstance(response, list) and not response:
        return HttpResponse(reason="No data available", status=400)
    return JsonResponse(response)