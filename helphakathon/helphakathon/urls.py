from django.contrib import admin
from django.urls import path, include

from hack.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('hack.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("api/accounts/", include("hack.urls")),
    path("all-profiles/", UserProfileListCreateView.as_view(), name="all-profiles"),
]
