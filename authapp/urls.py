from django.urls import path
from . import views
urlpatterns = [
    path('',views.ViewUser.as_view()),
    path('create/',views.RegisterUser.as_view()),
]
