from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^summoner/', views.get_summoner, name='get_summoner'),
	url(r'^matchlist/', views.get_matchlist, name='get_matchlist'),
	url(r'^match/', views.get_match, name='get_match'),
	url(r'^rune/opt/', views.get_opt_runes, name='get_opt_runes'),
	url(r'^rune/info/', views.get_rune_info, name='get_rune_info'),

]