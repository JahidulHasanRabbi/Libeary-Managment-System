# Generated by Django 4.2.1 on 2023-06-09 10:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_book_fecture"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="edition",
        ),
        migrations.AlterField(
            model_name="book",
            name="authour",
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name="book",
            name="isbn",
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.DeleteModel(
            name="Authour",
        ),
    ]
