from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
import uuid
from .managers import CustomUserManager
print(timezone.now)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    name = models.CharField(max_length=50)
    email = models.EmailField()
    username = models.CharField(max_length=250, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    can_view = models.BooleanField(default=True)
    can_edit = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)
    can_upload = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
         return self.username
    
class Authour(models.Model):
    """
    Authour Model
    """
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Book(models.Model):
    id = models.UUIDField(default=uuid.uuid4,
                        primary_key=True,
                        unique=True,
                        editable=False)
    isbn = models.IntegerField()
    title = models.CharField(max_length=250)
    authour = models.ForeignKey(Authour, on_delete=models.CASCADE)
    publisher = models.CharField(max_length=100)
    edition = models.CharField(max_length=50)
    page = models.CharField(max_length=50)
    cover = models.CharField(max_length=50)
    qty = models.IntegerField()
    revision = models.CharField(max_length=50)


#Book Reserve
class BookReserve(models.Model):
    id = models.UUIDField(default=uuid.uuid4,
                        primary_key=True,
                        unique=True,
                        editable=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    return_date = models.DateTimeField(default=timezone.now)
    status = models.BooleanField(default=False)

class Fine(models.Model):
    id = models.UUIDField(default=uuid.uuid4,
                        primary_key=True,
                        unique=True,
                        editable=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    amount = models.IntegerField()
    status = models.BooleanField(default=False)