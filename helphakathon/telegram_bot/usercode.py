import psycopg2
import telebot
from telebot import types
conn = psycopg2.connect(
    dbname="hackathon", user="postgres", password="123456", host="localhost"
)


class UserCode:
    @staticmethod
    def set_user_by_code(code, user_account, tg_id):
        cursor = conn.cursor()
        cursor.execute(f"""SELECT id FROM public.hack_userprofile WHERE user_code = '{code}';""")
        user_id = cursor.fetchall()
        if len(user_id) > 0:
            cursor.execute(
                f"""UPDATE public.hack_userprofile SET telegram = '{user_account}' WHERE user_id = '{user_id[0][0]}';""")
            conn.commit()
            cursor.execute(
                f"""UPDATE public.hack_userprofile SET telegram_id = '{tg_id}' WHERE user_id = '{user_id[0][0]}';""")
            conn.commit()
            cursor.close()
            return True
        else:
            return False

    @staticmethod
    def get_id_users():
        id_list = list()
        cursor = conn.cursor()
        cursor.execute(f"""SELECT telegram_id FROM public.hack_userprofile WHERE telegram_id > 0;""")
        for id in cursor.fetchall():
            id_list.append(id[0])
        return id_list

    @staticmethod
    def get_all_id_users():
        id_list = list()
        cursor = conn.cursor()
        cursor.execute(f"""SELECT telegram_id FROM public.hack_alltelegramusers;""")
        for id in cursor.fetchall():
            print(id)
            id_list.append(id[0])
        return id_list


class Notifications:
    @staticmethod
    def sending_notifications(message):
        bot = telebot.TeleBot("1831584021:AAHNcZXQ7x-kDxGv6mlN3Qbg9c5i-F8UAZw", parse_mode=None)
        users = UserCode.get_id_users()
        for user in users:
            print(user)
            bot.send_message(user, message)

    @staticmethod
    def sending_notifications_all_users(message):
        bot = telebot.TeleBot("1831584021:AAHNcZXQ7x-kDxGv6mlN3Qbg9c5i-F8UAZw", parse_mode=None)
        users = UserCode.get_all_id_users()
        print(users)
        for user in users:
            print(user)
            bot.send_message(user, message)

    @staticmethod
    def create_telegram_user(telegram_id):
        cursor = conn.cursor()
        if not Notifications.user_exist(telegram_id):
            cursor.execute(
                f"""INSERT INTO public.hack_alltelegramusers(telegram_id) VALUES({telegram_id})"""
            )
            conn.commit()
        cursor.close()

    @staticmethod
    def user_exist(telegram_id):
        cursor = conn.cursor()
        cursor.execute(f"""SELECT telegram_id FROM public.hack_alltelegramusers where id_telegram={telegram_id}""")
        return len(cursor.fetchall()) > 0