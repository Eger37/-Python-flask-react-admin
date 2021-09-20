import json
from types import SimpleNamespace

with open('./config.json', 'r') as cf:
    config = json.load(cf, object_hook=lambda d: SimpleNamespace(**d))
