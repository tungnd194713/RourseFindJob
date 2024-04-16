const chatbox = document.getElementById('fb-customer-chat');
chatbox.setAttribute("page_id", document.querySelector('meta[name="app_id"]').content);
chatbox.setAttribute("attribution", "biz_inbox");


// Your SDK code

window.fbAsyncInit = function () {
    window.FB.init({
        xfbml: true,
        version: 'v12.0'
    });
};

(function (d, s, id) {
    let js = d.getElementsByTagName(s)[0];
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
