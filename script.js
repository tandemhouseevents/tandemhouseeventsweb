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
  var status = document.getElementById('form-status');
  var submitButton = form ? form.querySelector('button[type="submit"]') : null;

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? 'hsl(0 84% 65%)' : 'hsl(var(--primary))';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setStatus('Sending...', false);
      if (submitButton) submitButton.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            setStatus("Thanks — we've got your message and will be in touch soon.", false);
          } else {
            return response.json().then(function (data) {
              var errorMessage =
                data && data.errors
                  ? data.errors.map(function (err) { return err.message; }).join(', ')
                  : 'Something went wrong. Please try again or email us directly.';
              throw new Error(errorMessage);
            });
          }
        })
        .catch(function (err) {
          setStatus(err.message || 'Something went wrong. Please try again or email us directly.', true);
        })
        .finally(function () {
          if (submitButton) submitButton.disabled = false;
        });
    });
  }
})();
