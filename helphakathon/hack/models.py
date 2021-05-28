from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

ROLE_CHOICES = (
                ("Developer", "Разработчик"),
                ("Mentor", "Ментор"),
                ("Organizer-Admin", "Организатор-админ"),
                ("Sponsor", "Спонсор")
                )


class Case(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='case_image')
    teams = ArrayField(ArrayField(models.CharField(max_length=100, blank=False)), blank=False, default=[])

    def __str__(self):
        return self.title


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Пользователь")
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default="Разработчик", verbose_name="Роль")
    description = models.TextField(blank=True, null=True, verbose_name="Описание")
    telegram = models.CharField(max_length=100, blank=True)
    city = models.TextField(verbose_name="Город")
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username


class Team(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    url_git = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class EventSchedule(models.Model):
    title = models.CharField(max_length=255)
    date_time = models.DateTimeField()

    def __str__(self):
        return self.title

