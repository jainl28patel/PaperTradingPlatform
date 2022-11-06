from django.urls import path
from . import views

urlpatterns = [
    path('buy/',views.buy,name="index"),
    path('sell/',views.sell,name="index"),
    path('bookmark/',views.bookmark,name="index"),
    path('getbalance/',views.getbalance,name="index"),
    path('gettransaction/',views.gettransaction,name="index"),
    path('getbookmark/',views.getbookmark,name="index"),
]

