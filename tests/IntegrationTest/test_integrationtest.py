import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


def test_website_functionality():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run Chrome in headless mode
    chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration (optional)
    chrome_options.add_argument("--no-sandbox")  # Bypass OS security model (optional)
    chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems (optional)

    driver = webdriver.Chrome()

    driver.get('https://relevancescannerfrontend-338628837206.us-central1.run.app/resume-upload')

    file_path = os.path.abspath('res.docx')

    file_input = driver.find_element(By.CSS_SELECTOR, 'input[type="file"]')
    file_input.send_keys(file_path)
    upload_button = driver.find_element(By.CLASS_NAME, 'upload-btn')
    upload_button.click()

    driver.quit()