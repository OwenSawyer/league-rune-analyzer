from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^summoner/', views.get_summoner, name='get_summoner'),
	url(r'^matchlist/', views.get_matchlist, name='get_matchlist'),
	url(r'^match/', views.get_match, name='get_match'),
	url(r'^rune/opt/', views.get_popular_runes_for_champion, name='get_popular_runes'),
	url(r'^rune/info/', views.get_rune_info, name='get_rune_info'),

]