# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-21 21:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dplace_app', '0081_add_hraf_chirila_links'),
    ]

    operations = [
        migrations.CreateModel(
            name='LanguageTreeLabels',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(db_index=True, max_length=255)),
                ('language', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dplace_app.Language')),
            ],
            options={
                'ordering': ('-languagetreelabelssequence__fixed_order',),
            },
        ),
        migrations.CreateModel(
            name='LanguageTreeLabelsSequence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fixed_order', models.PositiveSmallIntegerField(db_index=True)),
                ('labels', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dplace_app.LanguageTreeLabels')),
                ('society', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dplace_app.Society')),
            ],
            options={
                'ordering': ('-fixed_order',),
            },
        ),
        migrations.RemoveField(
            model_name='languagetree',
            name='languages',
        ),
        migrations.AddField(
            model_name='languagetreelabels',
            name='languageTree',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dplace_app.LanguageTree'),
        ),
        migrations.AddField(
            model_name='languagetreelabels',
            name='societies',
            field=models.ManyToManyField(through='dplace_app.LanguageTreeLabelsSequence', to='dplace_app.Society'),
        ),
        migrations.AddField(
            model_name='languagetree',
            name='taxa',
            field=models.ManyToManyField(null=True, to='dplace_app.LanguageTreeLabels'),
        ),
    ]
