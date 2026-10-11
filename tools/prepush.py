"""Run exact outgoing engineering and actual-source browser checks."""
import argparse
import subprocess

import engineering_checks

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--base', default='origin/main')
parser.add_argument('--working', action='store_true')
args = parser.parse_args()
engineering_checks.run(args.base, args.working)
for command in [
    ['python3', '-m', 'unittest', 'discover', '-s', 'tools', '-p', 'test_tooling_*.py'],
    ['npm', 'audit', '--prefix', 'tools/browser', '--audit-level=high'],
    ['npm', 'test', '--prefix', 'tools/browser'],
]:
    subprocess.run(command, cwd=engineering_checks.ROOT, check=True)
