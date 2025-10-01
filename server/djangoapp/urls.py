# Uncomment the imports before you add the code
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.views.generic import TemplateView

app_name = 'djangoapp'
urlpatterns = [
    # path for registration
    path(route='register', view=views.registration, name='registration'),

    # path for login
    path(route='login', view=views.login_user, name='login'),

    #path(route='logout', view=views.logout_request, name='logout'),   ##############Not works, so I need to put it on djangoproject.py

    # path for dealer reviews view

    # path for add a review view

    #test
    path(route='get_cars', view=views.get_cars, name ='getcars'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
