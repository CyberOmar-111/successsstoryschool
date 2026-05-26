import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from server import SchoolPortalHandler


class handler(SchoolPortalHandler):
    pass
