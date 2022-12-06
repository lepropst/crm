from django.urls import path, include
from .views import CreateUserView, ManageUserView, LoginView
from knox import views as knox_views

urlpatterns = [
    # path('', include('knox.urls')),
    # path('register', SignUpAPI.as_view()),
    # path('login', SignInAPI.as_view()),
    # path('user', MainUser.as_view()),
    # path('logout', knox_views.LogoutView.as_view(), name="knox-logout"),
    path('create/', CreateUserView.as_view(), name="create"),
    path('profile/', ManageUserView.as_view(), name='profile'),
    path('login/', LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),

]
