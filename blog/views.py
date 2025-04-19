from rest_framework import viewsets
from .models import BlogPost, Category, Tag
from .serializers import BlogPostSerializer, CategorySerializer, TagSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True).order_by('-published_date')
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        tag = self.request.query_params.get('tag')
        
        if category:
            queryset = queryset.filter(categories__slug=category)
        if tag:
            queryset = queryset.filter(tags__slug=tag)
            
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    