from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.template.defaultfilters import slugify
from io import BytesIO
import os
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
import base64
from django.core.files.base import ContentFile

 

Gender_CHOICE = [    
    ('Male', 'Male'),
    ('Female', 'Female'),
]



class Register(models.Model):   
    user            =    models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True,null=True)
    entry_officer   =    models.CharField(max_length=500, blank=True, null=True)  
    first_name      =   models.CharField(max_length=200, blank=True, null=True)    
    last_name       =   models.CharField(max_length=200, blank=True, null=True)
    email           =   models.EmailField(blank=True, null=True)
    address         =   models.TextField(blank=True, null=True)
    gender          =   models.CharField(max_length=10,choices=Gender_CHOICE,help_text='Gender',blank=True, null=True)
    date_of_birth   =   models.DateField(blank=True, null=True)    
    phone_number    =   models.CharField(max_length=20, blank=True, null=True)
    
    passport        =   models.TextField(blank=True, null=True)   
    passport_img    =   models.ImageField(upload_to='passport', blank=True,null=True)

    right_thumb     =   models.TextField(blank=True, null=True)
    right_index     =   models.TextField(blank=True, null=True)
    left_thumb      =   models.TextField(blank=True, null=True)
    left_index      =   models.TextField(blank=True, null=True)

    right_thumb_img =   models.ImageField(upload_to='right_thumb' , blank=True,null=True)
    right_index_img =   models.ImageField(upload_to='right_index' , blank=True,null=True)
    left_thumb_img  =   models.ImageField(upload_to='left_thumb' , blank=True,null=True)
    left_index_img  =   models.ImageField(upload_to='left_index' , blank=True,null=True) 

    date_of_entry   =   models.DateField(auto_now=True,  blank=True, null=True)
    created_at      =   models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at      =   models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["-created_at", "-updated_at"]        
        
    def __str__(self):
        return str(str(self.first_name) +"_"+ str(self.pk))

    
        # return save_to

    def save(self, *args, **kwargs):          
        if self.user:
            self.entry_officer = str(self.user)

        # # convert base64 to png and save to database
        # if self.passport:
        #     format, imgstr = str(self.passport).split(';base64,') 
        #     ext = format.split('/')[-1]
        #     self.passport_img = ContentFile(base64.b64decode(imgstr), name=str(self.first_name)+str(self.id)+'_passport.' + ext)

        # if self.right_thumb:
        #     format, imgstr = str(self.right_thumb).split(';base64,') 
        #     ext = format.split('/')[-1]
        #     self.right_thumb_img = ContentFile(base64.b64decode(imgstr), name=str(self.first_name)+str(self.id)+'_right_thumb.' + ext)

        # if self.right_index:
        #     format, imgstr = str(self.right_index).split(';base64,') 
        #     ext = format.split('/')[-1]
        #     self.right_index_img = ContentFile(base64.b64decode(imgstr), name=str(self.first_name)+str(self.id)+'_right_index.' + ext)

        # if self.left_thumb:
        #     format, imgstr = str(self.left_thumb).split(';base64,') 
        #     ext = format.split('/')[-1]
        #     self.left_thumb_img = ContentFile(base64.b64decode(imgstr), name=str(self.first_name)+str(self.id)+'_left_thumb.' + ext)

        # if self.left_index:
        #     format, imgstr = str(self.left_index).split(';base64,') 
        #     ext = format.split('/')[-1]
        #     self.left_index_img = ContentFile(base64.b64decode(imgstr), name=str(self.first_name)+str(self.id)+'_left_index.' + ext)         
        
        super(Register, self).save(*args, **kwargs)


       
