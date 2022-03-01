from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path

urlpatterns = [
    
    # re_path(r'^.*', TemplateView.as_view(template_name='frontend/index.html')),
    path("", TemplateView.as_view(template_name='frontend/index.html')),
    path('data/', include('fscan.urls')),
    path('admin/', admin.site.urls),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)