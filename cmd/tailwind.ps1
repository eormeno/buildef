$scriptDirectory = $PSScriptRoot
$parentDirectory = Split-Path -Path $scriptDirectory -Parent

npx tailwindcss -i $scriptDirectory/input.css -o $parentDirectory/public/css/tailwind.out.css --watch