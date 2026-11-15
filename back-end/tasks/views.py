from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer



class TaskListCreateAPIView(APIView):
    def get(self,request):
        task = Task.objects.all()
        serlz = TaskSerializer(task,many=True)
        return Response(serlz.data)
        
    def post(self,request):
        serializer = TaskSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status= status.HTTP_200_OK
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class TaskDetailAPIView(APIView):
        
    def get_object(self,pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return None
    
    def get(self,request, pk):
        task = self.get_object(pk)
        
        if task is None:
            return Response(
                {'error' : 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        srlz = TaskSerializer(task)
        return Response(srlz.data)
    
    def put(self,request,pk):
        task = self.get_object(pk)
        
        task = self.get_object(pk)
                
        if task is None:
            return Response(
                {'error' : 'Task not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TaskSerializer(task, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

        

    def patch(self, request, pk):

        task = self.get_object(pk)

        if task is None:
            return Response(
                {"error": "Task not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TaskSerializer(
            task,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    def delete(self, request, pk):

        task = self.get_object(pk)

        if task is None:
            return Response(
                {"error": "Task not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        task.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
# Create your views here.
