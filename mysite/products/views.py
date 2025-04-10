from django.http import HttpResponse
from django.shortcuts import render

from .models import Product


# Create your views here.

# Index view
def index(request):
    # Test with fake Products
    p1 = Product()
    p1.product_name = "Product 1"
    p1.price = 10

    p2 = Product()
    p2.product_name = "Product 2"
    p2.price = 5

    context = { "products_list" : [ p1, p2 ] }
    return render(request,"index.html", context)


# Product view
def show(request, product_index):
    return HttpResponse("You're looking %dth product" % product_index)