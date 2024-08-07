import shutil
import os

if os.path.exists("dist"):
    shutil.rmtree("dist")

os.makedirs("dist")
shutil.copy("templates/index.html", "dist/index.html")
