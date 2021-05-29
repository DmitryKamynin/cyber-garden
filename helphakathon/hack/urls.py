from django.urls import path, include
from hack.views import *

urlpatterns = [
    path('case/', CaseList.as_view()),
    path('user-profile/', UserProfileList.as_view()),
    path('team/', TeamList.as_view()),
    path('event-schedule/', EventScheduleList.as_view()),
    path('mentors/', MentorsList.as_view()),
    path('partners/', PartnersList.as_view())
]