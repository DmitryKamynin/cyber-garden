import uuid
from django.contrib.auth.models import AnonymousUser
from hack.serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework import generics
from rest_framework import status
from django.http import JsonResponse
from django.forms.models import model_to_dict

from hack.models import *
from hack.license import *
from telegram_bot import usercode


class CaseList(generics.ListCreateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class UserProfileList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_context_data(self, **kwargs):
        context = super(UserProfileList, self).get_context_data(**kwargs)
        context['user_data'] = User.objects.all()
        print(context)
        return context


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


class MentorsList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.filter(role="Ментор")
    serializer_class = UserProfileSerializer


class PartnersList(generics.ListCreateAPIView):
    queryset = Partners.objects.all()
    serializer_class = PartnersSerializers


class UserCodeTelegramUpdate(generics.UpdateAPIView):
    queryset = UserProfile.objects.filter(role="Ментор")
    serializer_class = UserCodeTelegramSerialize


class TeamUpdateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.filter()
    serializer_class = TeamSerializer



@api_view(['GET'])
def create_code(request):
    if request.method == 'GET':
        user_code = uuid.uuid4()
        if request.user == AnonymousUser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            UserProfile.objects.filter(user=request.user).update(user_code=user_code)
            return Response({"code": user_code}, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_team(request):
    if request.method == 'POST':
        if request.user == AnonymousUser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            if "description" in request.data:
                team = Team.objects.create(title=request.data["title"], description=request.data["description"],
                                           users=[{"id": request.user.id, "username": request.user.username}, ])
            else:
                team = Team.objects.create(title=request.data["title"],
                                           users=[{"id": request.user.id, "username": request.user.username}, ])
            data = model_to_dict(team)
            UserProfile.objects.filter(pk=data['users'][0]["id"]).update(team={"id": data["id"], "title": data["title"]})

            return JsonResponse({"team": data}, status=status.HTTP_201_CREATED, safe=False)



@api_view(['POST'])
def send_notifications_auth_users(request):
    if request.method == 'POST':
        usercode.Notifications.sending_notifications(request.data["message"])
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def send_notifications_all_users(request):
    if request.method == 'POST':
        usercode.Notifications.sending_notifications_all_users(request.data["message"])
        return Response(status=status.HTTP_200_OK)


class Session(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerialize


class Periods(generics.ListCreateAPIView):
    queryset = Period.objects.all()
    serializer_class = PeriodSerialize


class PeriodsDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Period.objects.all()
    serializer_class = PeriodSerialize




@api_view(['GET'])
def all_period(request, id_session):
    if request.method == 'GET':
        data = list(Period.objects.filter(id_session=id_session).values())
        return JsonResponse(data, safe=False)


@api_view(['GET'])
def create_code(request):
    if request.method == 'GET':
        user_code = uuid.uuid4()
        if request.user == AnonymousUser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            UserProfile.objects.filter(user=request.user).update(user_code=user_code)
            return Response({"code": user_code}, status=status.HTTP_200_OK)

