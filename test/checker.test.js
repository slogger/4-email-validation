// Тестируем работу чекера
casper.test.begin('Checker tests', function suite(test) {
  casper
    .start('http://localhost:8000', function() {
      var actual;
      // Тестируем с валидным емейлом
      this.sendKeys('#email', 'test@test.me');
      actual = casper.evaluate(function() {
        return document.forms.auth.email.className;
      });
      this.test.assertEquals('auth_ok', actual, 'Valid email test');

      // Чистим поле
      this.sendKeys('#email', '', { reset : true });

      // Тестируем с невалидным емейлом
      this.sendKeys('#email', 'test');
      actual = casper.evaluate(function() {
        return document.forms.auth.email.className;
      });
      this.test.assertEquals('auth_error', actual, 'Invalid email test [simple text]');

      // Чистим поле
      this.sendKeys('#email', '', { reset : true });

      // Тестируем с невалидным емейлом
      this.sendKeys('#email', 'test@test');
      actual = casper.evaluate(function() {
        return document.forms.auth.email.className;
      });
      this.test.assertEquals('auth_error', actual, 'Invalid email test [text@text]');

      // Чистим поле
      this.sendKeys('#email', '', { reset : true });

      // Тестируем с невалидным емейлом
      this.sendKeys('#email', 'test@test.a');
      actual = casper.evaluate(function() {
        return document.forms.auth.email.className;
      });
      this.test.assertEquals('auth_error', actual, 'Invalid email test [short domen zone]');
    })
    .run(function() {
      test.done();
    });
});
