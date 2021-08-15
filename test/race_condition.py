import requests
import threading

# tested for race condition to write to logs

# change these to test different intensities
THREAD_NUMBER = 5
REQUEST_PER_THREAD = 10

# you can change your endpoint for your local server
port = "4000"
address = "http://localhost"

url = address + ":" + port

data = {
    "username": "ozan",
    "email": "ozan",
    "password": "ozan"
}


def send_requests():
    for i in range(REQUEST_PER_THREAD):
        response = requests.post(url, data=data).text
        print(response)


threads = []

for i in range(THREAD_NUMBER):
    t = threading.Thread(target=send_requests)
    t.daemon = True
    threads.append(t)

for i in range(THREAD_NUMBER):
    threads[i].start()

for i in range(THREAD_NUMBER):
    threads[i].join()
