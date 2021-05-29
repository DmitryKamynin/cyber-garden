from django.contrib import admin
from hack.models import *


class CaseAdmin(admin.ModelAdmin):
    fields = ['title', 'description' , 'image']

    class Meta:
        verbose_name = "Кейс"


class UserProfileAdmin(admin.ModelAdmin):
    fields = ['user', 'role', 'description', 'telegram', 'phone_number', 'city']

    class Meta:
        verbose_name = "Пользователь"


class TeamAdmin(admin.ModelAdmin):
    fields = ['title', 'description', 'url_git']

    class Meta:
        verbose_name = "Команда"


class EventScheduleAdmin(admin.ModelAdmin):
    fields = ['title', 'date_time']

    class Meta:
        verbose_name = "Расписание событий"


admin.site.register(Case, CaseAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(EventSchedule, EventScheduleAdmin)