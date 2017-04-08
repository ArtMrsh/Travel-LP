<?
if (isset ($_POST['message'])) {
  mail ("mirosh1308@gmail.com",
        "заполнена контактная форма с ".$_SERVER['HTTP_REFERER'],
        "Имя: ".$_POST['name']."\nEmail: ".$_POST['email']."\nТема: ".$_POST['subject']."\nСообщение: ".$_POST['message']);
  echo ('<p style="color: green">Ваше сообщение получено, спасибо!</p>');
}
?>
