# Generated by Django 4.1.2 on 2022-11-05 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdetail',
            name='id',
        ),
        migrations.AlterField(
            model_name='userdetail',
            name='username',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]