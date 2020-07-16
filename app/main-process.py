import subprocess

filename = 'server.py'
while True:
    p = subprocess.Popen('python3 '+filename+ ' ' + 'serve', shell=True).wait()
    if p != 0:
        continue
    else:
        break