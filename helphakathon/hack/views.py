
from hack.serializers import *

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from hack.models import *
from rest_framework.permissions import *
from hack.license import *


class CaseList(generics.ListCreateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class UserProfileList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer


class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class EventScheduleList(generics.ListCreateAPIView):
    queryset = EventSchedule.objects.all()
    serializer_class = EventScheduleSerializer


class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]
