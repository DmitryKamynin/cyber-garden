from config import *
import telebot
from telebot import types
from datetime import datetime
from usercode import *
#from keyboard import *
#import keyboard
from threading import Thread, Timer
import time
import datetime


bot = telebot.TeleBot(TOKEN, parse_mode=None)
print("start")


@bot.message_handler(commands=["start", "help"])
def start_message(message):
    bot.send_message(message.chat.id, "Привет, введи код который тебе выдали на сайте")
    Notifications.create_telegram_user(message.chat.id)
    print(message.from_user.username)
    bot.register_next_step_handler(message, get_code)


def get_code(message):
    print(message.text)
    if UserCode.set_user_by_code(message.text, f"@{message.from_user.username}", message.chat.id):
        bot.send_message(message.chat.id, "Спасибо")
    else:
        bot.send_message(message.chat.id, "Мы не можем найти такой код, введите код заново")
        bot.register_next_step_handler(message, get_code)


bot.polling()
