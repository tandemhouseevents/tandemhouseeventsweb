(function () {
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('mobile-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.setAttribute('data-open', 'false');
      });
    });
  }

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('input[type="text"]');
      var email = form.querySelector('input[type="email"]');
      var subject = encodeURIComponent('New enquiry from tandemhouse.in');
      var body = encodeURIComponent(
        'Name: ' + (name ? name.value : '') + '\nEmail: ' + (email ? email.value : '')
      );
      window.location.href = 'mailto:hello@tandemhouse.com?subject=' + subject + '&body=' + body;
    });
  }
})();
