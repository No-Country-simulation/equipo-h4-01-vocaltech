from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer
from django.conf import settings

# Create your views here.
from openai import OpenAI

client = OpenAI(api_key=settings.OPEN_API_KEY)
print("OpenAI client", settings.OPEN_API_KEY)


class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(
        detail=True,
        methods=["post"],
        url_path="send-messages",
    )
    def send_message(self, request, pk=None):
        conversation = self.get_object()
        user_message = request.data.get("message", "")

        if not user_message:
            return Response(
                {"error": "Message content is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        Message.objects.create(
            conversation=conversation,
            content=user_message,
            is_bot=False,
        )

        messages = [
            {
                "role": "system",
                "content": "Responde estrictamente con base en los mensajes dados. No uses conocimiento externo.",
            },
            {
                "role": "user",
                "content": "¿Cuál es la mejor manera de optimizar el uso de la memoria IA(AI)?",
            },
            {"role": "user", "content": "¿Qué servicios ofrece?"},
            {
                "role": "assistant",
                "content": "Los servicios son: liderar a través de la voz,entrenamiento personalizado, capacitaciones para las empresas coaching individual. Además simulaciones laborales mediante el desarrollo de software. En conclusiones, somos una alianza entre dos startups exitosas Vos y tu Voz y No Country. Esta fución se llama VocalTech",
            },
            {
                "role": "user",
                "content": "¿Cómo puedo acceder a un entremiento de la voz",
            },
            {
                "role": "assistant",
                "content": "Bien, primero se te hará un diágnostico para ofrecerte un mejor servicio.Este diagnóstico ayuda a reconocer que aspectos de tu negocio funcionan bien y cuáles necesitan mejora.",
            },
            {
                "role": "user",
                "content": "¿Cúanto dura una simulación laboral para el desarrollo de software?",
            },
            {
                "role": "assistant",
                "content": "Una simulación laboral dura 5 semanas. Además trajas en con un equipo multidiciplinario para que desarroles tus habilidades blandas y técnicas",
            },
            {
                "role": "user",
                "content": "¿Qué precio tiene un curso de entrenamiento de la voz?",
            },
            {
                "role": "assistant",
                "content": "En cuanto al precio o costo, se te atenderá de manera personalizada, una vez que hagas el proceso de diagnóstico un asesor se pondrá en contacto contigo.",
            },
            {
                "role": "user",
                "content": "¿Cómo entreno mi voz?",
            },
            {
                "role": "assistant",
                "content": "Es importante que mediante un diagnóstico de la voz, Vocaltech te puede dar una ruta a seguir para que eleves tus estándares de liderazgo, persuación y estilo único.",
            },
            {
                "role": "user",
                "content": "¿Cuánto cuesta una simulación laboral?",
            },
            {
                "role": "assistant",
                "content": "Las simulaciones laborales son totalmente gratuitas.",
            },
        ]

        for msg in conversation.messages.all():
            role = "assistant" if msg.is_bot else "user"
            messages.append({"role": role, "content": msg.content})

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                store=False,
                messages=messages,
                max_tokens=30,
                stop=["\n\n"],
                temperature=0,
            )

            bot_response = response.choices[0].message.content

            Message.objects.create(
                conversation=conversation,
                content=bot_response,
                is_bot=True,
            )
            return Response(
                {
                    "message": bot_response,
                }
            )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
