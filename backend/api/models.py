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

    def get_role(self):
        if self.is_superuser:
            return 'superuser'
        elif self.is_staff:
            return 'staff'
        else:
            return 'user'



class Book(models.Model):
    id = models.UUIDField(default=uuid.uuid4,
                        primary_key=True,
                        unique=True,
                        editable=False)
    isbn = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=250)
    author = models.CharField(max_length=50)
    publisher = models.CharField(max_length=100)
    page = models.CharField(max_length=50)
    cover = models.CharField(max_length=50)
    qty = models.IntegerField()
    revision = models.CharField(max_length=50)
    fecture = models.CharField(max_length=50)

class BorrowedBook(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrowed_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('BORROWED', 'Borrowed'), ('RETURNED', 'Returned')])

    def __str__(self):
        return f"{self.user.username} borrowed {self.book.title}"

    def save(self, *args, **kwargs):
        if not self.return_date:
            self.return_date = self.borrowed_date + timedelta(weeks=1)
        super().save(*args, **kwarg)


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
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    borrowed_book = models.ForeignKey(BorrowedBook, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    fine_amount = models.IntegerField(default=0)
    STATUS_CHOICES = (
        ('OVERDUE', 'Overdue'),
        ('PAID', 'Paid'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OVERDUE')

    def __str__(self):
        return f"Fine for {self.user.username}"

    def pay_fine(self):
        self.status = 'PAID'
        self.save()