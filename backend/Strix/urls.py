from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [

    # Login and Forgot password
    path('login/',views.Login.as_view()),
    path('logout/',views.Logout.as_view()),

    path('emailconfirmation/',views.EmailConfirmation.as_view()),
    path('passconfirmation/',views.PasswordConfirmation.as_view()),
    path('resetpassword/',views.ResetPassword.as_view()),

    path('projectlist/',views.ProjectList.as_view()),
    
    #testpath
    path('getTicket/<str:projectid>',views.getTicket,name="get_Tickets"),
    path('getpdetails/<str:projectid>',views.getProjectDetails,name="get_Project_details")

]



''' 
EndPoint 

1. login/
2. logout/
3. resetpassword/


'''



