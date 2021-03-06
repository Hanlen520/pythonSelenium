from Base.base import Base
from selenium.webdriver.common.by import By
import time


class OrderPage(Base):

    # '姓名'输入框
    def name_field(self):
        return self.find_ele(By.CSS_SELECTOR, "#pasglistdiv > div > ul > li:nth-child(2) > input")

    def user_info(self, name):
        self.name_field().send_keys(name)
        time.sleep(3)
        return self.url()
