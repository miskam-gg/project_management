from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Task, Comment
from django.core.mail import send_mail


@receiver(post_save, sender=Task)
def send_task_notification(sender, instance, created, **kwargs):
    if created:
        send_mail(
            'New Task Created',
            f'A new task "{instance.title}" has been created.',
            'from@example.com',
            [instance.assigned_to.email],
            fail_silently=False,
        )


@receiver(post_save, sender=Comment)
def send_comment_notification(sender, instance, created, **kwargs):
    if created:
        send_mail(
            'New Comment Added',
            f'A new comment has been added to the task "{instance.task.title}".',
            'from@example.com',
            [instance.task.assigned_to.email],
            fail_silently=False,
        )