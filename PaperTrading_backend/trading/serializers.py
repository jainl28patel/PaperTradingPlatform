from rest_framework import serializers
from .models import *

class BuySerializer(serializers.ModelSerializer):
    class Meta:
        model = Buy
        fields = ['username', 'user_id', 'stock_name', 'stock_price', 'stock_quantity']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['username', 'user_id', 'stock_name', 'stock_quantity', 'stock_price', 'date_time', 'buy_sell']

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['username', 'user_id', 'stock_name', 'stock_price']

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ['username', 'user_id', 'balance']