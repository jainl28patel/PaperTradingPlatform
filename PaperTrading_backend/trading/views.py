from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework import serializers
from accounts.serializers import JwtSerializer
from accounts.models import UserDetail
from .serializers import *
import datetime

@api_view(['POST'])
def buy(request):
    jwt_token = request.data['jwt_token']
    user_data = UserDetail.objects.get(jwt_token=jwt_token)
    username_id = JwtSerializer(user_data)

    #check if user has enough balance
    balance = Balance.objects.get(user_id=username_id.data['id'])
    balance_serializer = BalanceSerializer(balance)
    if(balance_serializer.data['balance'] < request.data['stock_price']*request.data['stock_quantity']):
        return Response({'error': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        new_balance = int(balance_serializer.data['balance']) - int(request.data['stock_price'])*int(request.data['stock_quantity'])
        balance_serializer = BalanceSerializer(balance, data={'balance': new_balance}, partial=True)
        if balance_serializer.is_valid():
            balance_serializer.save()

    #check if user already has the stock
    stock = Buy.objects.filter(user_id=username_id.data['id'], stock_name=request.data['stock_name'])
    if(len(stock)==0):
        print(stock)
        serializer_buy = BuySerializer(data={
            'username': username_id.data['username'],
            'user_id': username_id.data['id'],
            'stock_name': request.data['stock_name'],
            'stock_price': request.data['stock_price'],
            'stock_quantity': request.data['stock_quantity']
    })
    else:
        stock_serializer = BuySerializer(stock[0])
        new_quantity = int(stock_serializer.data['stock_quantity']) + int(request.data['stock_quantity'])
        serializer_buy = BuySerializer(stock[0], data={'stock_quantity': new_quantity}, partial=True)
        if not serializer_buy.is_valid():
            return Response(serializer_buy.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer_transaction = TransactionSerializer(data={
        'username': username_id.data['username'],
        'user_id': username_id.data['id'],
        'stock_name': request.data['stock_name'],
        'stock_quantity': request.data['stock_quantity'],
        'stock_price': request.data['stock_price'],
        'date_time': datetime.datetime.now().strftime("%c"),
        'buy_sell': 'Buy'
    })
    if serializer_buy.is_valid() and serializer_transaction.is_valid():
        serializer_buy.save()
        serializer_transaction.save()
        return Response({'buy':serializer_buy.data,'transaction':serializer_transaction.data}, status=status.HTTP_201_CREATED)
    return Response(serializer_buy.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def sell(request):
    jwt_token = request.data['jwt_token']
    user_data = UserDetail.objects.get(jwt_token=jwt_token)
    username_id = JwtSerializer(user_data)

    stock = Buy.objects.filter(user_id=username_id.data['id'], stock_name=request.data['stock_name'])
    if(len(stock)==0):
        return Response({'error': 'No stock found'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        stock_serializer = BuySerializer(stock[0])
        if(stock_serializer.data['stock_quantity'] < request.data['stock_quantity']):
            return Response({'error': 'Insufficient stock quantity'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            new_quantity = int(stock_serializer.data['stock_quantity']) - int(request.data['stock_quantity'])
            serializer_buy = BuySerializer(stock[0], data={'stock_quantity': new_quantity}, partial=True)
            if not serializer_buy.is_valid():
                return Response(serializer_buy.errors, status=status.HTTP_400_BAD_REQUEST)
            
            new_balance = int(request.data['stock_price'])*int(request.data['stock_quantity']) + int(Balance.objects.get(user_id=username_id.data['id']).balance)
            balance_serializer = BalanceSerializer(Balance.objects.get(user_id=username_id.data['id']), data={'balance': new_balance}, partial=True)
            if balance_serializer.is_valid():
                balance_serializer.save()

    serializer_transaction = TransactionSerializer(data={
        'username': username_id.data['username'],
        'user_id': username_id.data['id'],
        'stock_name': request.data['stock_name'],
        'stock_quantity': request.data['stock_quantity'],
        'stock_price': request.data['stock_price'],
        'date_time': datetime.datetime.now().strftime("%c"),
        'buy_sell': 'Sell'
    })
    if serializer_buy.is_valid() and serializer_transaction.is_valid():
        serializer_buy.save()
        serializer_transaction.save()
        return Response({'sell':serializer_buy.data,'transaction':serializer_transaction.data}, status=status.HTTP_201_CREATED)
    return Response(serializer_buy.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def bookmark(request):
    jwt_token = request.data['jwt_token']
    user_data = UserDetail.objects.get(jwt_token=jwt_token)
    username_id = JwtSerializer(user_data)

    #checking if already bookmarked or not 
    bookmark = Bookmark.objects.filter(user_id=username_id.data['id'], stock_name=request.data['stock_name'])
    if(len(bookmark)==0):
        serializer_bookmark = BookmarkSerializer(data={
            'username': username_id.data['username'],
            'user_id': username_id.data['id'],
            'stock_name': request.data['stock_name'],
            'stock_price': request.data['stock_price'],
        })
        if serializer_bookmark.is_valid():
            serializer_bookmark.save()
            return Response(serializer_bookmark.data, status=status.HTTP_201_CREATED)
        return Response(serializer_bookmark.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Already bookmarked'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def getbalance(request):
    jwt_token = request.data['jwt_token']
    user_data = UserDetail.objects.get(jwt_token=jwt_token)
    username_id = JwtSerializer(user_data)

    serializer_balance = BalanceSerializer(Balance.objects.get(user_id=username_id.data['id']))
    return Response(serializer_balance.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def gettransaction(request):
    jwt_token = request.data['jwt_token']
    user_data = UserDetail.objects.get(jwt_token=jwt_token)
    username_id = JwtSerializer(user_data)

    serializer_transaction = TransactionSerializer(Transaction.objects.filter(user_id=username_id.data['id']), many=True)
    return Response(serializer_transaction.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def getbookmark(request):
    jwt_token = request.data['jwt_token']
    user_data = UserDetail.objects.get(jwt_token=jwt_token)
    username_id = JwtSerializer(user_data)

    serializer_bookmark = BookmarkSerializer(Bookmark.objects.filter(user_id=username_id.data['id']), many=True)
    return Response(serializer_bookmark.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def getstock(request):
    jwt_token = request.data['jwt_token']
    user_data = UserDetail.objects.get(jwt_token=jwt_token)
    username_id = JwtSerializer(user_data)

    serializer_stocks = BuySerializer(Buy.objects.filter(user_id=username_id.data['id']), many=True)
    return Response(serializer_stocks.data, status=status.HTTP_200_OK)