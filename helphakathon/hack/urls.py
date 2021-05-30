from django.urls import path, include
from hack.views import *

urlpatterns = [
    path('case/', CaseList.as_view()),
    path('user-profile/', UserProfileList.as_view()),
    path('user-profile/<int:pk>/', UserProfileListCreateView.as_view()),
    path('team/', TeamList.as_view()),
    path('team/<int:pk>/', TeamUpdateDetail.as_view()),
    path('event-schedule/', EventScheduleList.as_view()),
    path('mentors/', MentorsList.as_view()),
    path('partners/', PartnersList.as_view()),
    path('user-code/', UserCodeTelegramUpdate.as_view()),
    path('create-code/', create_code),
    path('send-notifications-auth-users/', send_notifications_auth_users),
    path('send_notifications_all_users/', send_notifications_all_users),
    path('session/', Session.as_view()),
    path('session/<int:id_session>/', all_period),
    path('period/', Periods.as_view()),
    path('period/<int:pk>/', PeriodsDetails.as_view()),
    path('create_team/', create_team),
]
