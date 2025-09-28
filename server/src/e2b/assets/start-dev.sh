#!/bin/bash
cd /home/user || { echo "Failed to cd to /home/user"; exit 1; }
npm run dev