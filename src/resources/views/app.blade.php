<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script defer src="{{ mix('/js/lms-theme.js') }}"></script>
    <link rel="stylesheet" href="{{ mix('css/lms-theme.css') }}"></link>
    <link
    href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
    rel="stylesheet"
    />
    <link
    href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
    rel="stylesheet"
    />
    @php
        $measurement_id = env('MIX_ANALYTICS_TRACKING_ID', null);
    @endphp

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="{{ "https://www.googletagmanager.com/gtag/js?id={$measurement_id}" }}"></script>
    <script>
        window.measurement_id = '{{ $measurement_id }}'
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
    </script>
    <!-- End Google Analytics -->

    <!-- Favicon -->
    @php
        use NadzorServera\Skijasi\Helpers\Config;
    @endphp
    {{-- <link rel="shortcut icon" href="{{ Storage::url(Config::get('commerceThemeFavicon')) }}" type="image/x-icon"> --}}
</head>

<body>
    @inertia
</body>

</html>