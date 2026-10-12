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

      var name = document.getElementById('field-name').value.trim();
      var company = document.getElementById('field-company').value.trim();
      var email = document.getElementById('field-email').value.trim();
      var phone = document.getElementById('field-phone').value.trim();
      var interestSelect = document.getElementById('field-interest');
      var interest = interestSelect.options[interestSelect.selectedIndex].text;
      var message = document.getElementById('field-message').value.trim();

      if (!name || !email) {
        alert('Please fill in at least your name and email.');
        return;
      }

      var subject = encodeURIComponent('New enquiry from tandemhouse.in: ' + name);
      var bodyLines = [
        'Name: ' + name,
        'Company: ' + (company || '-'),
        'Email: ' + email,
        'Phone: ' + (phone || '-'),
        "Interested in: " + (interest !== 'Select an option' ? interest : '-'),
        '',
        'Message:',
        message || '-'
      ];
      var body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = 'mailto:hello@tandemhouse.com?subject=' + subject + '&body=' + body;
    });
  }
})();
