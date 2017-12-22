# views.py
from django.db import Error
from django.http import JsonResponse
from django.shortcuts import HttpResponse
import json
from .models import User, Url
from .serializers import UserSerializer, UrlSerializer


def index(request):
    return JsonResponse([{"title" : "ahhhh"},
						 {"title" : "323333"}], safe=False)

def user(request):
    if request.method == 'GET':
        return JsonResponse({'data':UserSerializer(User.objects.all().order_by('id'),many=True).data})

    if request.method == 'POST':
        data = json.loads(request.body.decode())
        user = User(user=data.get('user'),
                    id=User.generate_id(),
                    address=data.get('address'))
        user.save()
        return JsonResponse(UserSerializer(User.objects.get(id=user.id)).data)

def short(request):

    if request.method == 'POST':
        data = json.loads(request.body.decode())
        url = None
        while url is None:
            try:
                url = Url.objects.create(original=data.get('url'),
                                        shortened=Url.generate_id())
            except Error:
                pass

        return JsonResponse(UrlSerializer(url).data)

def transfer(request, link):

    if request.method == 'GET':
        url = None
        while url is None:
            try:
                url = Url.objects.get(shortened='tophat.ly/'+link)
            except Url.DoesNotExist:
                return HttpResponse('Url not Found', status=400)

        res = HttpResponse(url.original, status=302)
        abs_url = url.original
        if not '://' in url.original:
            abs_url = 'http://' + abs_url
        res['Location'] = abs_url
        return res