<html>
<head>
<title>BookStore</title>
<script type="text/javascript" src="jquery-1.7.1.js"></script>
<script  type="text/javascript" src="class.js"></script>
<script  type="text/javascript" src="WebSocketDataAdapter.js"></script>
<script type="text/javascript" src="analyticsLoader.js"></script>
<script  type="text/javascript" src="check_if_field_empty.js"></script>
<link rel="stylesheet" type="text/css" href="welcome_page.css" />
</head>
<body>
<img src="images/books.gif" /><br>
Please Specify Name of the Book whose details you wish to see.<br>
C<br>
C++<br>
Java<br>
<form action="getDetails.do" name="details" method="post"  onsubmit="return emptyField();">
<input type="text" name="bookName"><br>
<input type="submit" name="getDetails" value="Get Details"> <!-- onclick="window.open('http://localhost:8080/SimpleMVCExampleAntAnt/details.jsp')"/> --> 

<!--
<form>
<input type="button" value="Open Window" onclick="window.open('http://www.google.com')">
</form>
-->
</form>
</body>
</html>