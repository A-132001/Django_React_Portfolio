from django.urls import path
from .views import MyTokenObtainPairView, RegisterView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
]