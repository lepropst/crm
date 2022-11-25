from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import time
import os
BASE_DIR = 'frontend'


BASE_DIR = "frontend"


def rename():
    if os.path.exists(BASE_DIR):
        print("renaming files")
        for count, filename in enumerate(os.listdir(BASE_DIR)):
            dst = f"frontend_{filename}"
            # foldername/filename, if .py file is outside folder
            src = f"{BASE_DIR}/{filename}"
            dst = f"{BASE_DIR}/{dst}"
            print(f'renamed{src} \ntoo {dst}')
            # rename() function will
            # rename all the files
            os.rename(src, dst)


class Watcher:

    def __init__(self):
        self.observer = Observer()

    def run(self):
        event_handler = Handler()
        self.observer.schedule(
            event_handler, BASE_DIR, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(5)
        except:
            self.observer.stop()
            print("Error")

        self.observer.join()


class Handler(FileSystemEventHandler):

    @staticmethod
    def on_any_event(event):
        if event.is_directory:
            return None

        elif event.event_type == 'created':
            # Take any action here when a file is first created.
            print("Received created event - %s." % event.src_path)
            rename()

        elif event.event_type == 'modified':
            # Taken any action here when a file is modified.
            print("Received modified event - %s." % event.src_path)
            # rename()


if __name__ == '__main__':
    w = Watcher()
    w.run()
