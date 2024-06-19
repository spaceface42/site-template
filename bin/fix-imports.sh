#!/bin/bash

# Directory to process
DIR="./docs/rsrc/app"

# Function to fix import statements in a given file
fix_imports() {
  local file="$1"
  # Use sed to add .js to import paths
  sed -i.bak -E "s|import (.* from ['\"].*[^.])(.*['\"])|import \1.js\2|g" "$file"
  # Remove backup file created by sed
  rm "$file.bak"
}

# Function to process all .js files in the directory recursively
process_directory() {
  local directory="$1"
  for file in "$directory"/*; do
    if [ -d "$file" ]; then
      process_directory "$file"
    elif [[ "$file" == *.js ]]; then
      fix_imports "$file"
    fi
  done
}

# Start processing the directory
process_directory "$DIR"

echo "Import paths updated."
