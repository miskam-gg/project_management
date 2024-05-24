from django.urls import path, include
from .views import UserCreate, CommentViewSet, project_report, UserViewSet, current_user, CurrentUserView
from .views import ProjectViewSet, TaskViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserCreate.as_view(), name='user-create'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('project/<int:pk>/report/', project_report, name='project-report'),
    path('current_user/', CurrentUserView.as_view(), name='current_user'),
]

