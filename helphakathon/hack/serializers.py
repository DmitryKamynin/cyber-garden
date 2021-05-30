from hack.models import *
from rest_framework import serializers
from django.contrib.postgres.fields import ArrayField

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ('id', 'title', 'description', 'image')


class UserProfileSerializer(serializers.ModelSerializer):
    role = serializers.CharField(max_length=30, required=False)
    class Meta:
        model = UserProfile
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    users = ArrayField(models.JSONField(blank=True, null=True), blank=True, null=True, default={})
    title = serializers.CharField(max_length=255)
    class Meta:
        model = Team
        fields = ('id', 'title', 'description', 'url_git', 'users')


class EventScheduleSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField()

    class Meta:
        model = EventSchedule
        fields = ('id', 'title', 'date_time')


class PartnersSerializers(serializers.ModelSerializer):

    class Meta:
        model = Partners
        fields = ('id', 'title', 'description', 'image')


class UserCodeTelegramSerialize(serializers.ModelSerializer):
    user_code = serializers.CharField(max_length=100)
    telegram = serializers.CharField(max_length=100)

    class Meta:
        model = UserProfile
        fields = ('id', 'telegram', 'user_code')


class PeriodSerialize(serializers.ModelSerializer):

    class Meta:
        model = Period
        fields = '__all__'


class SessionSerialize(serializers.ModelSerializer):
    title = serializers.CharField(max_length=100)

    class Meta:
        model = Session
        fields = ('id', 'title', 'date_start', 'id_mentor')
