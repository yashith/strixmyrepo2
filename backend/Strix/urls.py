from django.contrib import admin
from django.urls import path,include
from . import views




getTickets= views.TicketViewSet.as_view({
    'get': 'list',
    'post':'create',
    
})
getaATicket=views.TicketViewSet.as_view({
    'get': 'retrieve',
})

getProject=views.ProjectViewSet.as_view({
    'get': 'list',
})

getTicketMedia=views.TicketMediaViewset.as_view({
    'get': 'list',
    'post':'create',
})

getUser=views.UserViewset.as_view({
    'get': 'list',
})



urlpatterns = [

    # Login and Forgot password
    path('login/',views.Login.as_view()),
    path('logout/',views.Logout.as_view()),

    path('emailconfirmation/',views.EmailConfirmation.as_view()),
    path('passconfirmation/',views.PasswordConfirmation.as_view()),
    path('resetpassword/',views.ResetPassword.as_view()),

    path('projectlist/',views.ProjectList.as_view()),
    
    #testpath
    # path('getTicket/<str:projectid>',views.getTicket,name="get_Tickets"),
    # path('getpdetails/<str:projectid>',views.getProjectDetails,name="get_Project_details")
    path('getTicket/',getTickets,name="get_Tickets"),
    path('getTicket/<str:pk>',getaATicket,name="get_Ticket"),
    path('getProject/',getProject,name="get_project_Details"),
    path('getTicketMedia/',getTicketMedia,name="get_ticket_media"),
    path('getUsers/',getUser,name="get_users"),
]



''' 
EndPoint 

1. login/
2. logout/
3. resetpassword/


'''



