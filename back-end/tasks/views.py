
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer
from .user_serializers import RegisterSerializer


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response(
            {
                'id': user.id,
                'username': user.username,
                'message': 'User registered successfully'
            },
            status=status.HTTP_201_CREATED
        )


class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)




# from django.shortcuts import render

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from .models import Task
# from .serializers import TaskSerializer



# class TaskListCreateAPIView(APIView):
    # def get(self,request):
        # task = Task.objects.all()
        # serlz = TaskSerializer(task,many=True)
        # print(serlz.data)
        # return Response(serlz.data, status= status.HTTP_200_OK)
        
    # def post(self,request):
        # serializer = TaskSerializer(data = request.data)
        # if serializer.is_valid():
            # serializer.save()
            # return Response(
                # serializer.data,
                # status= status.HTTP_200_OK
            # )
        # return Response(
            # serializer.errors,
            # status=status.HTTP_400_BAD_REQUEST
        # )
    
# class TaskDetailAPIView(APIView):
        
    # def get_object(self,pk):
        # try:
            # return Task.objects.get(pk=pk)
        # except Task.DoesNotExist:
            # return None
    
    # def get(self,request, pk):
        # task = self.get_object(pk)
        
        # if task is None:
            # return Response(
                # {'error' : 'Task not found'},
                # status=status.HTTP_404_NOT_FOUND
            # )
        # srlz = TaskSerializer(task)
        # return Response(srlz.data)
    
    # def put(self,request,pk):
        # task = self.get_object(pk)
        
        # task = self.get_object(pk)
                
        # if task is None:
            # return Response(
                # {'error' : 'Task not found'},
                # status=status.HTTP_404_NOT_FOUND
            # )
        # serializer = TaskSerializer(task, request.data)
        # if serializer.is_valid():
            # serializer.save()
            # return Response(serializer.data)

        # return Response(
            # serializer.errors,
            # status=status.HTTP_400_BAD_REQUEST
        # )

        

    # def patch(self, request, pk):

        # task = self.get_object(pk)

        # if task is None:
            # return Response(
                # {"error": "Task not found"},
                # status=status.HTTP_404_NOT_FOUND
            # )

        # serializer = TaskSerializer(
            # task,
            # data=request.data,
            # partial=True
        # )

        # if serializer.is_valid():
            # serializer.save()
            # return Response(serializer.data)

        # return Response(
            # serializer.errors,
            # status=status.HTTP_400_BAD_REQUEST
        # )


    # def delete(self, request, pk):

        # task = self.get_object(pk)

        # if task is None:
            # return Response(
                # {"error": "Task not found"},
                # status=status.HTTP_404_NOT_FOUND
            # )

        # task.delete()

        # return Response(
            # status=status.HTTP_204_NO_CONTENT
        # )



# from rest_framework.viewsets import ModelViewSet
# from .models import Task
# from .serializers import TaskSerializer

# from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated

# from .user_serializers import RegisterSerializer


# class TaskViewSet(ModelViewSet):

    # serializer_class = TaskSerializer
    # permission_classes = [IsAuthenticated]

    # def get_queryset(self):
        # return Task.objects.filter(user=self.request.user)

    # def perform_create(self, serializer):
        # serializer.save(user=self.request.user)
# class RegisterAPIView(APIView):

    # permission_classes = [AllowAny]

    # def post(self, request):

        # serializer = RegisterSerializer(data=request.data)

        # serializer.is_valid(raise_exception=True)

        # user = serializer.save()

        # return Response(
            # {
                # 'id': user.id,
                # 'username': user.username,
                # 'message': 'User registered successfully'
            # },
            # status=status.HTTP_201_CREATED
        # )