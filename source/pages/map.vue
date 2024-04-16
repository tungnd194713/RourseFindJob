<template>
  <div>
    <div id="my-map"></div>
    <div id="tooltip"></div>
  </div>
</template>

<script>
export default {
    layout: 'nossr',
    head: {
        title: 'Bản đồ',
        script: [
            {
                src: "https://unpkg.com/japan-map-js@1.0.1/dist/jpmap.min.js",
                ssr: false,
            },
            {
                src: "http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js",
                ssr: true
            },
            {
                src: "/map.js",
                ssr: false,
                body: true
            },

        ],
    },
}
</script>
