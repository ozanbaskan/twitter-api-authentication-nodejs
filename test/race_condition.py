import requests
import threading

# tested for race condition to write to logs

port = "3000"
address = "http://localhost"

url = address + ":" + port

data = {
    "username": "ozan",
    "email": "ozan",
    "password": "ozan"
}


def send_requests():
    for i in range(10):
        response = requests.post(url, data=data).text
        print(response)


threads = []

for i in range(3):
    t = threading.Thread(target=send_requests)
    t.daemon = True
    threads.append(t)

for i in range(3):
    threads[i].start()

for i in range(3):
    threads[i].join()
