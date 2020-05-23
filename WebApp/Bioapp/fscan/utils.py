import numpy as np
import cv2
import glob, os
from tensorflow import keras
import warnings
import base64
from django.db.models import Q
import itertools
from django.core.files.base import ContentFile
from .models import Register
from django.conf import settings

def model_loader():
    model = load_model('model.h5')   
    return model

def base64converter(base64str):
    format1, base64str = str(base64str).split(';base64,')  
    imgdata = base64.b64decode(base64str)
    filename = 'sample_image.png'
    with open(filename, 'wb') as f:
        f.write(imgdata)
    return f.name

def process_img(raw_img):  
    sort_img =sorted(glob.glob(raw_img))
    imgs = np.empty((len(sort_img), 90,90), dtype=np.uint8)
    for i, img_path in enumerate(sort_img):
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (90, 90))
        imgs[i] = img
        to_array =  imgs[i]
        to_array = to_array.reshape(1,90, 90, 1)        
        return to_array



def Predicter (specimen):
    try:
        specimen = specimen.get('upload')
    except:
        specimen = specimen.get('fingerprint')

    specimen_to_array = process_img(base64converter(specimen))     
    model =keras.models.load_model('model.h5')
    # get_all_fingerprints= Register.objects.values_list('right_thumb' ,'right_index','left_thumb','left_index').distinct()
    get_all_fingerprints= Register.objects.values_list('right_thumb_img' ,'right_index_img','left_thumb_img','left_index_img').distinct()
   
    trap_all_fingers=[] 
    trap_all_predictions=[]   
    for finger in itertools.chain.from_iterable(get_all_fingerprints):                
        if "/" in finger and finger != '' and finger != ' ':                     
            trap_all_fingers.append(finger)            
            try:  
                trap_all_predictions.append((model.predict([process_img(settings.MEDIA_ROOT +'/'+ finger), specimen_to_array]).round(10)).tolist())
            except:
                return [0,0,0,0]

    all_predictions_to_list = []
    all_predictions_as_dict_key = []
    for val in itertools.chain.from_iterable(trap_all_predictions):             
        all_predictions_to_list.append(val)
    for val in itertools.chain.from_iterable(all_predictions_to_list):
        all_predictions_as_dict_key.append(val)

    result_zipper = dict(zip(all_predictions_as_dict_key, trap_all_fingers))  
    ordered_pred = sorted(all_predictions_as_dict_key) 
    if len(ordered_pred) > 0:
        match1 = str(result_zipper.get(ordered_pred[-1]))      
        match2 = str(result_zipper.get(ordered_pred[-2]))       
        match3 = str(result_zipper.get(ordered_pred[-3]))
        top_match =ordered_pred[-1]
        final_results = [match1,match2,match3,top_match]
    else:
        final_results = [0,0,0,0]
    return final_results

def get_or_none(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None

def get_matching_queries(match): 
    if get_or_none(Register, right_thumb_img=str(match)):
        return get_or_none(Register, right_thumb_img=str(match))              
    elif get_or_none(Register, left_thumb_img=str(match)):
        return get_or_none(Register, left_thumb_img=str(match))  
    elif get_or_none(Register, left_index_img=str(match)):
        return get_or_none(Register, left_index_img=str(match))  
    else:
        get_or_none(Register, right_index_img=str(match))
        return get_or_none(Register, right_index_img=str(match))  

def get_sample_context(query_set, match):
    split_match = match.split('/')  
    match_query = split_match[0]
    if query_set != None:                   
      column_names = ['pk','first_name', 'last_name', 'passport','Finger' ]
      column_datatypes = [query_set.pk, query_set.first_name, query_set.last_name, query_set.passport, match_query]
      schema_dict = [dict(zip(column_names, column_datatypes))]         
      return schema_dict
    else:  
      return False












#  sample1= get_sample_context(get_matching_queries(match1), match1)     

# def sendToScreen(result_list):
#     check_top_match = result_list[-1]
#     if check_top_match > 0.4:
        

    #     def get_sample_context(context_name, query_set, match):
    #         split_match = match.split('/')  
    #         match_query = split_match[0]
    #         if query_set != None:                   
    #             column_names = ['slug','first_name', 'last_name', 'passport','Finger' ]
    #             column_datatypes = [query_set.slug, query_set.first_name, query_set.last_name, query_set.passport, match_query]
    #             schema_dict = [dict(zip(column_names, column_datatypes))]
    #             return context.update({context_name:schema_dict})
    #         else:
    #             no_column_names = ['match']
    #             no_column_datatypes = [False]
    #             no_schema_dict = dict(zip(no_column_names, no_column_datatypes))
    #             return context.update({'match':no_schema_dict})

    #     get_sample_context('sample_1',get_matching_queries(match1), match1)           
    #     get_sample_context('sample_2',get_matching_queries(match2), match2)      
    #     get_sample_context('sample_3',get_matching_queries(match3), match3)         
        
    #     context.update({'match':True})
    #     del self.request.session['sample']  
    # else:             
        
    #     context.update({'match':False})
    #     del self.request.session['sample']  






   

    


# specimen = specimen.get('upload')
# #the sample is first converted from base64 to png and then to array with shape 1,90,90, 1
# specimen_to_array = process_img(base64converter(specimen)) 
# # the model is Loaded
# model = model = load_model('model.h5')
# print('\n model loaded')
# #buckes 
# all_predictions=[]
# all_fingers=[]            
# # get all finger prints in the db
# get_all_fp= Register.objects.values_list('right_thumb' ,'right_index','left_thumb','left_index').distinct()
# # for finger in get_all_fp:
# for finger in itertools.chain.from_iterable(get_all_fp):             
#     if finger != "" and finger:                    
#         # store all for zipping                   
#         all_fingers.append(finger)                                    
#         # process (convert all fp img to array and predict them with the specimen)               
#         all_predictions.append((model.predict([process_img(settings.MEDIA_ROOT +'/'+ finger), specimen_to_array]).round(10)).tolist())                     
# #zip predictions with thier respective finger print in the data base
# zipable_list1 = []
# zipable_list2 = []
# for val in itertools.chain.from_iterable(all_predictions):             
#     zipable_list1.append(val)
# for val in itertools.chain.from_iterable(zipable_list1):
#     zipable_list2.append(val)

# zipper = dict(zip(zipable_list2, all_fingers))
# # order the prediuction from highest to loweest
# odered_pred = sorted(zipable_list2)
# # get the picture match of the top three predictions
# match1 = str(zipper.get(odered_pred[-1]))                 
# match2 = str(zipper.get(odered_pred[-2]))         
# match3 = str(zipper.get(odered_pred[-3]))
# matcher = odered_pred[-1]
# print(matcher)
# #check if there is a match or not
# if matcher > 0.4:

#     def get_or_none(model, **kwargs):
#         try:
#             return model.objects.get(**kwargs)
#         except model.DoesNotExist:
#             return None

#     def get_matching_queries(match): 
#         if get_or_none(Register, right_thumb=str(match)):
#             return get_or_none(Register, right_thumb=str(match))              
#         elif get_or_none(Register, left_thumb=str(match)):
#             return get_or_none(Register, left_thumb=str(match))  
#         elif get_or_none(Register, left_index=str(match)):
#             return get_or_none(Register, left_index=str(match))  
#         else:
#             get_or_none(Register, right_index=str(match))
#             return get_or_none(Register, right_index=str(match))    

#     def get_sample_context(context_name, query_set, match):
#         split_match = match.split('/')  
#         match_query = split_match[0]
#         if query_set != None:                   
#             column_names = ['slug','first_name', 'last_name', 'passport','Finger' ]
#             column_datatypes = [query_set.slug, query_set.first_name, query_set.last_name, query_set.passport, match_query]
#             schema_dict = [dict(zip(column_names, column_datatypes))]
#             return context.update({context_name:schema_dict})
#         else:
#             no_column_names = ['match']
#             no_column_datatypes = [False]
#             no_schema_dict = dict(zip(no_column_names, no_column_datatypes))
#             return context.update({'match':no_schema_dict})

#     get_sample_context('sample_1',get_matching_queries(match1), match1)           
#     get_sample_context('sample_2',get_matching_queries(match2), match2)      
#     get_sample_context('sample_3',get_matching_queries(match3), match3)         
    
#     context.update({'match':True})
#     del self.request.session['sample']  
# else:             
    
#     context.update({'match':False})
#     del self.request.session['sample']  