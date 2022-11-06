from django.db import models

# Create your models here.

class Buy(models.Model):
    username = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    stock_name = models.CharField(max_length=100)
    stock_price = models.IntegerField()  #total price of all stock = each_stock_price * stock_quantity
    stock_quantity = models.IntegerField()

class Transaction(models.Model):
    username = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    stock_name = models.CharField(max_length=100)
    stock_quantity = models.IntegerField()
    stock_price = models.IntegerField()
    date_time = models.CharField(max_length=100)
    buy_sell = models.CharField(max_length=100, null=True)

class Bookmark(models.Model):
    username = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    stock_name = models.CharField(max_length=100)
    stock_price = models.IntegerField()

class Balance(models.Model):
    username = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    balance = models.IntegerField()