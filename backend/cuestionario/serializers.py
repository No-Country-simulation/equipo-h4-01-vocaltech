from rest_framework import serializers
from .models import QuestionGroup, QuestionSubGroup, Question, AnswerOption, Recommendation
from mutagen import File
from mutagen.wave import WAVE
from mutagen.mp3 import MP3
from mutagen.flac import FLAC
from mutagen.oggvorbis import OggVorbis


class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ["id", "answer_options", "text"]

class AnswerOptionSerializer(serializers.ModelSerializer):
    recommendations = RecommendationSerializer(many=True, required=False, write_only=True)

    class Meta:
        model = AnswerOption
        fields = ["id", "question", "text", "recommendations"]

class QuestionSerializer(serializers.ModelSerializer):
    options = AnswerOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'options', 'question_type']

class QuestionSubGroupSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = QuestionSubGroup
        fields = ['id', 'name', 'questions']

class QuestionGroupSerializer(serializers.ModelSerializer):
    subgroups = QuestionSubGroupSerializer(many=True, read_only=True)

    class Meta:
        model = QuestionGroup
        fields = ['id', 'name', 'subgroups']