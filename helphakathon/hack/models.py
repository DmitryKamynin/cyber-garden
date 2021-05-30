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
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Пользователь", blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    patronymic = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default="Разработчик", verbose_name="Роль", blank=True)
    description = models.TextField(blank=True, null=True, verbose_name="Описание")
    telegram = models.CharField(max_length=100, blank=True)
    telegram_id = models.IntegerField(blank=True, null=True)
    city = models.TextField(verbose_name="Город", blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='user_image', blank=True)
    user_code = models.CharField(max_length=100, blank=True)
    team = models.JSONField(default={}, blank=True, null=True)
    #user_name = User.objects.get(user__user_id=user)


    def __str__(self):
        return self.user.username


class Team(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    url_git = models.URLField(blank=True, null=True)
    users = ArrayField(models.JSONField(blank=True, null=True), blank=True, null=True, default={})

    def __str__(self):
        return self.title


class EventSchedule(models.Model):
    title = models.CharField(max_length=255)
    date_time = models.DateTimeField()

    def __str__(self):
        return self.title


class Partners(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название партнера")
    description = models.TextField(blank=True, null=True, verbose_name="Описание")
    image = models.ImageField(upload_to='partners_image')

    def __str__(self):
        return self.title


class AllTelegramUsers(models.Model):
    telegram_id = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.telegram_id


class Session(models.Model):
    title = models.CharField(max_length=100)
    date_start = models.DateTimeField(blank=True, null=True)
    id_mentor = models.ForeignKey("UserProfile", on_delete=models.PROTECT, blank=True)

    def __str__(self):
        return self.title


class Period(models.Model):
    free_status = models.BooleanField(default=True)
    id_team = models.ForeignKey("Team", on_delete=models.PROTECT, blank=True, null=True)
    comment_team = models.TextField(blank=True, null=True)
    comment_mentor = models.TextField(blank=True, null=True)
    mentor_assessment = models.CharField(blank=True, null=True, max_length=100)
    id_session = models.ForeignKey("Session", on_delete=models.PROTECT)
    success_status = models.BooleanField(default=False)


