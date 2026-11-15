from django.urls import path

from .views import TaskListCreateAPIView

urlpatterns = [
    path(
        'tasks/',
        TaskListCreateAPIView.as_view(),
        name='task-list-create'
    ),
    path(
        'tasks/<int:pk>/',
        TaskListCreateAPIView.as_view(),
        name='task-detail'
    ),
]