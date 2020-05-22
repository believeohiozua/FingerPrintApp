from rest_framework import generics, permissions,  pagination ,serializers, views, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Register
from .serializers import RegisterSerializer, UserSerializer, SignUpSerializer, LoginSerializer

from .utils import ( Predicter , get_matching_queries, get_sample_context)

 

class SampleSerializer(serializers.Serializer): 
   upload =serializers.JSONField()   
  #  fingerprint = serializers.FileField()


class VerificationView(views.APIView):
    serializer_class = SampleSerializer
    permission_classes =( permissions.AllowAny,)
   

    # def get(self, request):
    #   context = request.session.get('context')
    #   #  {
    #   #             'sample1': request.session.get('sample1'),
    #   #             'sample2': request.session.get('sample2'),
    #   #             'sample3': request.session.get('sample3'),
    #   #             'matchfound': request.session.get('matchfound'),
    #   #             }  
    #   return Response(context)

    def post(self,request):              
      serializer=SampleSerializer(data={**request.data,**request.FILES})
      if serializer.is_valid():
        pred_result = Predicter(serializer.data)
        match1 = pred_result[0]
        match2 = pred_result[1]
        match3 = pred_result[2]
        check_top_match =pred_result[3]
        print('\n this is the highest match',check_top_match, match3, match2, match1 )
        if check_top_match > 0.4:
          sample1= get_sample_context(get_matching_queries(match1), match1)           
          sample2= get_sample_context(get_matching_queries(match2), match2)      
          sample3= get_sample_context(get_matching_queries(match3), match3)   
          print((sample1, sample2, sample3)) 
          matchfound = True         
          context = {
          'sample1': sample1,
          'sample2': sample2,
          'sample3': sample3,
          'matchfound': matchfound,
          }  
          return Response(context)        
        else:        
          context = {
          'sample1': None,
          'sample2': None,
          'sample3': None,
          'matchfound': False,
          }        
          return Response(context)
      else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

# @api_view()
# def VerificationView(request):
#     serializer=SampleSerializer(data={**request.data,**request.FILES})
#     if serializer.is_valid():
#       pred_result = Predicter(serializer.data)
#       match1 = pred_result[0]
#       match2 = pred_result[1]
#       match3 = pred_result[2]
#       check_top_match =pred_result[3]
#       print('\n this is the highest match',check_top_match, match3, match2, match1 )
#       if check_top_match > 0.4:
#         sample1= get_sample_context(get_matching_queries(match1), match1)           
#         sample2= get_sample_context(get_matching_queries(match2), match2)      
#         sample3= get_sample_context(get_matching_queries(match3), match3)   
#         print((sample1, sample2, sample3)) 
#         matchfound = True
#         context = {
#         'sample1': sample1,
#         'sample2': sample2,
#         'sample3': sample3,
#         'matchfound': matchfound,
#         }  
#         # request.session['context'] =context
#         return Response(context)        
#       else:  
#         matchfound  = False
#         context = { 'matchfound': matchfound}       
#         return Response(context)
#     else:
#       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class VerificationView(views.APIView):
#     serializer_class = SampleSerializer
#     permission_classes =( permissions.IsAuthenticated,)#( permissions.AllowAny,)
   

#     def get(self, request):
#       context = {
#                   'sample1': request.session.get('sample1'),
#                   'sample2': request.session.get('sample2'),
#                   'sample3': request.session.get('sample3'),
#                   'matchfound': request.session.get('matchfound'),
#                   }  
#       return Response(context)

#     def post(self,request):              
#       serializer=SampleSerializer(data={**request.data,**request.FILES})
#       if serializer.is_valid():
#         pred_result = Predicter(serializer.data)
#         match1 = pred_result[0]
#         match2 = pred_result[1]
#         match3 = pred_result[2]
#         check_top_match =pred_result[3]
#         print('\n this is the highest match',check_top_match, match3, match2, match1 )
#         if check_top_match > 0.4:
#           sample1= get_sample_context(get_matching_queries(match1), match1)           
#           sample2= get_sample_context(get_matching_queries(match2), match2)      
#           sample3= get_sample_context(get_matching_queries(match3), match3)   
#           print((sample1, sample2, sample3)) 
#           matchfound = True
#           request.session['sample1'] =sample1
#           request.session['sample2'] =sample2
#           request.session['sample3'] =sample3
#           request.session['matchfound'] =matchfound
#           # del self.request.session['sample1'] 
#           # del self.request.session['sample2'] 
#           # del self.request.session['sample3'] 
#           # del self.request.session['matchfound']  
#         else:  
#           matchfound  = False
#           request.session['matchfound'] =matchfound
#           del self.request.session['matchfound']  
#         return Response(serializer.data)
#       else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 




class RegisterPageNumberPagination(pagination.PageNumberPagination):
  page_size = 8
  page_size_query_param = 'size'
  max_page_size = 20


  def get_paginated_response(self, data):        
    this_user = False
    user = self.request.user
    if user.is_authenticated:
        this_user = True  

    context = {          
        'next': self.get_next_link(),
        'previous': self.get_previous_link(),
        'count': self.page.paginator.count,
        'this_user': this_user,
        'results': data,    
        "search_query": Register.objects.values('pk', 
                        'first_name', 
                        'last_name').distinct(),     
    } 

    return Response(context)
 
class RegisterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Register.objects.all()
    serializer_class    = RegisterSerializer
    lookup_field        = 'pk'
    permission_classes =  ( permissions.IsAuthenticated,)


class RegisterListView(generics.ListCreateAPIView):
    queryset            = Register.objects.all()
    serializer_class    =  RegisterSerializer
    permission_classes =  ( permissions.IsAuthenticated,)
    pagination_class    =  RegisterPageNumberPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


#AUTHENTICATION






# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = SignUpSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)
    })

# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })

# Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user