<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>My Dynamic Site</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link href="{{ asset('css/tailwind.out.css') }}" rel="stylesheet">
</head>

<body class="font-sans text-gray-900 antialiased">
    <div class="min-h-screen flex flex-col items-center pt-6 bg-gray-100 dark:bg-gray-900">
        <div>
            <a href="/">
                <x-logo2 size=24 color="#888888" />
            </a>
        </div>

        <div class="w-auto mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
            <div id="content"></div>
        </div>
    </div>
    <!-- Status Bar -->
    <div class="bg-slate-300 p-2 fixed bottom-0 left-0 right-0">
        <p id="version" class="text-center text-slate-600 text-xs font-light"></p>
    </div>

    <script type="module" src="{{ asset('js/button.component.js') }}"></script>
    <script type="module" src="{{ asset('js/form.component.js') }}"></script>
    <script type="module" src="{{ asset('js/input.component.js') }}"></script>
    <script type="module" src="{{ asset('js/paragraph.component.js') }}"></script>
    <script type="module" src="{{ asset('js/starter.js') }}"></script>

</body>

</html>
