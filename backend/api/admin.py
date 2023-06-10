from django.contrib import admin
from .models import User, Book, BookReserve, Fine


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser')}),
        ('Roles', {'fields': ('can_view', 'can_edit', 'can_delete', 'can_upload')}),
    )
    readonly_fields = ('date_joined',)
    filter_horizontal = ()
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_superuser')}
        ),
    )


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('isbn', 'title', 'author', 'publisher', 'qty', 'cover', 'revision')
    list_filter = ('publisher',)
    search_fields = ('isbn', 'title')
    ordering = ('title',)
    fieldsets = (
        (None, {'fields': ('isbn', 'title', 'authour', 'publisher', 'page', 'cover', 'qty', 'revision', 'feature')}),
    )
    readonly_fields = ('id',)
    filter_horizontal = ()


